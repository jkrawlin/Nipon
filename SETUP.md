# Qatar Payroll System - Complete Setup Guide

This guide will walk you through setting up the Qatar Payroll Management System from A to Z.

## 🔧 Prerequisites

### Required Software
- **Node.js** (version 16.0 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)

### Required Accounts
- **Firebase Account** - [Create here](https://firebase.google.com/)
- **Google Cloud Account** (for Firebase Functions) - [Create here](https://cloud.google.com/)

## 📁 Project Structure

```
qatar-payroll-app/
├── public/                 # Static files
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── services/         # Firebase services
│   ├── store/            # Redux store and slices
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── hooks/            # Custom React hooks
│   ├── i18n/             # Internationalization
│   ├── styles/           # Theme and styles
│   └── config/           # Configuration files
├── functions/            # Firebase Cloud Functions
├── firebase.json         # Firebase configuration
├── package.json          # Dependencies and scripts
└── README.md             # Documentation
```

## 🚀 Installation Steps

### 1. Clone and Setup Project

```bash
# Clone the repository
git clone <your-repo-url>
cd qatar-payroll-app

# Install dependencies
npm install

# Install Firebase CLI globally
npm install -g firebase-tools
```

### 2. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: "qatar-payroll-system"
4. Enable Google Analytics (optional)
5. Create project

#### Enable Firebase Services
1. **Authentication**:
   - Go to Authentication → Sign-in method
   - Enable "Email/Password"
   - Add authorized domains if needed

2. **Firestore Database**:
   - Go to Firestore Database
   - Create database in production mode
   - Choose region closest to Qatar (e.g., asia-south1)

3. **Storage**:
   - Go to Storage
   - Get started with default settings
   - Choose same region as Firestore

4. **Hosting** (optional):
   - Go to Hosting
   - Get started
   - Follow setup instructions

#### Configure Firebase in Project
1. Go to Project Settings → General → Your apps
2. Click "Add app" → Web app
3. Register app with nickname "qatar-payroll-web"
4. Copy Firebase configuration
5. Create `.env` file in project root:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
REACT_APP_FIREBASE_APP_ID=your_app_id_here
REACT_APP_COMPANY_NAME=Qatar Payroll Company
REACT_APP_COMPANY_EMAIL=info@qatarpayroll.com
REACT_APP_COMPANY_PHONE=+974-XXXX-XXXX
```

### 3. Firebase Security Rules

#### Firestore Rules
Create `firestore.rules` file:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /employees/{employeeId} {
      allow read, write: if request.auth != null;
    }
    
    match /customers/{customerId} {
      allow read, write: if request.auth != null;
    }
    
    match /payroll/{payrollId} {
      allow read, write: if request.auth != null;
    }
    
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Storage Rules
Create `storage.rules` file:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4. Initialize Firebase in Project

```bash
# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init

# Select the following services:
# - Firestore
# - Storage  
# - Hosting
# - Functions (optional)

# Choose existing project: qatar-payroll-system
# Accept default settings for most questions
```

### 5. Development Setup

```bash
# Start development server
npm start

# The app will open at http://localhost:3000
```

### 6. Create First Admin User

Since this is a demo, create a test admin user:

1. Go to Firebase Console → Authentication → Users
2. Click "Add user"
3. Email: `admin@qatarpayroll.com`
4. Password: `admin123`
5. Click "Add user"

### 7. Sample Data (Optional)

You can add sample data through the Firebase console or create a data seeding script.

#### Sample Employee Data
```json
{
  "personalInfo": {
    "firstName": "Ahmed",
    "lastName": "Al-Mansouri",
    "email": "ahmed.almansouri@company.com",
    "phone": "+974-5555-0001",
    "dateOfBirth": "1985-03-15",
    "nationality": "Qatari",
    "address": "Doha, Qatar"
  },
  "employmentInfo": {
    "employeeId": "EMP001",
    "jobTitle": "Senior Developer",
    "department": "IT",
    "hireDate": "2020-01-15",
    "employmentStatus": "active",
    "baseSalary": 15000,
    "currency": "QAR"
  },
  "documents": {
    "passport": {
      "number": "A12345678",
      "issuingCountry": "Qatar",
      "issueDate": "2020-01-01",
      "expiryDate": "2030-01-01"
    },
    "qatarId": {
      "number": "12345678901",
      "issueDate": "2020-01-01",
      "expiryDate": "2025-01-01"
    }
  }
}
```

## 🔧 Configuration Options

### Environment Variables
```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=

# Application Settings
REACT_APP_COMPANY_NAME=
REACT_APP_COMPANY_EMAIL=
REACT_APP_COMPANY_PHONE=
REACT_APP_DEFAULT_CURRENCY=QAR
REACT_APP_DEFAULT_LOCALE=en-QA
REACT_APP_DOCUMENT_EXPIRY_WARNING_DAYS=30
```

### Theme Customization
Edit `src/styles/theme.ts` to customize:
- Colors
- Typography
- Component styles
- Breakpoints

### Language Support
Edit `src/i18n/index.ts` to:
- Add new languages
- Update translations
- Configure language detection

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run E2E tests (if Cypress is configured)
npm run cypress:run
```

## 📊 Monitoring and Analytics

### Firebase Analytics
1. Go to Firebase Console → Analytics
2. Enable Google Analytics
3. Configure events and conversions

### Performance Monitoring
1. Go to Firebase Console → Performance
2. Enable Performance Monitoring
3. Add custom traces in code

### Crashlytics (Optional)
1. Go to Firebase Console → Crashlytics
2. Enable Crashlytics
3. Add error reporting to app

## 🚀 Deployment

### Method 1: Manual Deployment
```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy
```

### Method 2: Using Deploy Script
```bash
# Make script executable (Linux/Mac)
chmod +x deploy.sh
./deploy.sh

# Or on Windows
deploy.bat
```

### Method 3: CI/CD with GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Firebase
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: qatar-payroll-system
```

## 🔐 Security Checklist

- [ ] Firebase Security Rules configured
- [ ] Environment variables secured
- [ ] Authentication properly implemented
- [ ] Input validation in place
- [ ] File upload restrictions configured
- [ ] HTTPS enforced
- [ ] Regular security updates

## 🐛 Troubleshooting

### Common Issues

1. **Firebase not connecting**
   - Check environment variables
   - Verify Firebase project settings
   - Check network connectivity

2. **Build errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear React cache: `npm start -- --reset-cache`

3. **Authentication issues**
   - Check Firebase Auth configuration
   - Verify authorized domains
   - Check user permissions

4. **Firestore permission denied**
   - Review security rules
   - Check user authentication state
   - Verify document structure

### Getting Help

- **Documentation**: Check Firebase docs
- **Community**: Firebase Discord/Stack Overflow
- **Support**: Firebase Support (paid plans)

## 📈 Performance Optimization

### Code Splitting
```javascript
// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));
```

### Caching
- Enable Firebase hosting cache headers
- Implement service worker caching
- Use React Query for API caching

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx serve -s build
```

## 🔄 Maintenance

### Regular Tasks
- Update dependencies monthly
- Review and update security rules
- Monitor performance metrics
- Backup Firestore data
- Update documentation

### Monitoring
- Set up Firebase alerts
- Monitor error rates
- Track user engagement
- Review performance metrics

## 📞 Support

For support and questions:
- Email: support@qatarpayroll.com
- Documentation: [Link to docs]
- Issue Tracker: [GitHub Issues]

---

**🎉 Congratulations! Your Qatar Payroll System is now ready for use.**

The system includes:
- ✅ Employee management with document tracking
- ✅ Customer relationship management
- ✅ Payroll processing and salary tracking
- ✅ Automated document expiry notifications
- ✅ Invoice generation and receipt printing
- ✅ Multi-language support (English/Arabic)
- ✅ Responsive design for mobile and desktop
- ✅ Secure Firebase backend
- ✅ Real-time data synchronization
