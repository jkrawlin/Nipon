// Firebase Security Rules for Firestore
export const firestoreRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Employees collection - Admin and HR only
    match /employees/{employeeId} {
      allow read, write: if request.auth != null && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'hr']);
    }
    
    // Customers collection - Admin, HR, and Finance
    match /customers/{customerId} {
      allow read, write: if request.auth != null && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'hr', 'finance']);
    }
    
    // Payroll collection - Admin and Finance only
    match /payroll/{payrollId} {
      allow read, write: if request.auth != null && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'finance']);
    }
    
    // Transactions collection - Admin and Finance only
    match /transactions/{transactionId} {
      allow read, write: if request.auth != null && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'finance']);
    }
    
    // Invoices collection - Admin and Finance
    match /invoices/{invoiceId} {
      allow read, write: if request.auth != null && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'finance']);
    }
    
    // Notifications - Users can read their own notifications
    match /notifications/{notificationId} {
      allow read: if request.auth != null && 
        request.auth.uid in resource.data.targetUsers;
      allow write: if request.auth != null && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'hr']);
    }
    
    // Cash flow entries - Admin and Finance only
    match /cashflow/{entryId} {
      allow read, write: if request.auth != null && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'finance']);
    }
  }
}
`;

// Firebase Storage Rules
export const storageRules = `
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Employee documents
    match /employees/{employeeId}/{allPaths=**} {
      allow read, write: if request.auth != null && 
        (request.auth.token.role == 'admin' || request.auth.token.role == 'hr');
    }
    
    // Customer documents
    match /customers/{customerId}/{allPaths=**} {
      allow read, write: if request.auth != null && 
        (request.auth.token.role == 'admin' || 
         request.auth.token.role == 'hr' || 
         request.auth.token.role == 'finance');
    }
    
    // Invoice documents
    match /invoices/{invoiceId}/{allPaths=**} {
      allow read, write: if request.auth != null && 
        (request.auth.token.role == 'admin' || request.auth.token.role == 'finance');
    }
  }
}
`;

// Cloud Functions for document expiry notifications
export const cloudFunctionCode = `
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { google } = require('googleapis');

admin.initializeApp();

// Check for expiring documents daily
exports.checkExpiringDocuments = functions.pubsub.schedule('0 9 * * *')
  .timeZone('Asia/Qatar')
  .onRun(async (context) => {
    const db = admin.firestore();
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    try {
      const employeesSnapshot = await db.collection('employees').get();
      const notifications = [];
      
      employeesSnapshot.forEach(doc => {
        const employee = doc.data();
        const passportExpiry = employee.documents.passport.expiryDate.toDate();
        const qatarIdExpiry = employee.documents.qatarId.expiryDate.toDate();
        
        // Check passport expiry
        if (passportExpiry <= thirtyDaysFromNow && passportExpiry >= today) {
          notifications.push({
            type: 'document_expiry',
            title: 'Passport Expiring Soon',
            message: \`\${employee.personalInfo.firstName} \${employee.personalInfo.lastName}'s passport expires on \${passportExpiry.toDateString()}\`,
            priority: 'high',
            targetUsers: ['admin', 'hr'],
            relatedEntityId: doc.id,
            relatedEntityType: 'employee',
            isRead: false,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
          });
        }
        
        // Check Qatar ID expiry
        if (qatarIdExpiry <= thirtyDaysFromNow && qatarIdExpiry >= today) {
          notifications.push({
            type: 'document_expiry',
            title: 'Qatar ID Expiring Soon',
            message: \`\${employee.personalInfo.firstName} \${employee.personalInfo.lastName}'s Qatar ID expires on \${qatarIdExpiry.toDateString()}\`,
            priority: 'high',
            targetUsers: ['admin', 'hr'],
            relatedEntityId: doc.id,
            relatedEntityType: 'employee',
            isRead: false,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
          });
        }
      });
      
      // Save notifications
      const batch = db.batch();
      notifications.forEach(notification => {
        const ref = db.collection('notifications').doc();
        batch.set(ref, notification);
      });
      
      await batch.commit();
      console.log(\`Created \${notifications.length} notifications\`);
      
    } catch (error) {
      console.error('Error checking expiring documents:', error);
      throw new functions.https.HttpsError('internal', 'Failed to check expiring documents');
    }
  });

// Send email notifications
exports.sendEmailNotification = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate(async (snap, context) => {
    const notification = snap.data();
    
    if (notification.type === 'document_expiry') {
      // Send email using Gmail API or SendGrid
      // Implementation would depend on chosen email service
      console.log('Sending email notification:', notification.title);
    }
  });

// Generate payroll report
exports.generatePayrollReport = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { month, year } = data;
  const db = admin.firestore();
  
  try {
    const payrollSnapshot = await db.collection('payroll')
      .where('period.month', '==', month)
      .where('period.year', '==', year)
      .get();
    
    const report = {
      period: { month, year },
      totalEmployees: payrollSnapshot.size,
      totalGrossPay: 0,
      totalDeductions: 0,
      totalNetPay: 0,
      records: []
    };
    
    payrollSnapshot.forEach(doc => {
      const record = doc.data();
      report.totalGrossPay += record.salary.totalGross;
      report.totalDeductions += record.deductions.totalDeductions;
      report.totalNetPay += record.netPay;
      report.records.push({ id: doc.id, ...record });
    });
    
    return report;
  } catch (error) {
    console.error('Error generating payroll report:', error);
    throw new functions.https.HttpsError('internal', 'Failed to generate report');
  }
});
`;
