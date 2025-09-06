import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { Employee } from '../types';

export class EmployeeService {
  private collectionName = 'employees';

  async getAllEmployees(): Promise<Employee[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, this.collectionName), orderBy('createdAt', 'desc'))
      );
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamps to Date objects
        personalInfo: {
          ...doc.data().personalInfo,
          dateOfBirth: doc.data().personalInfo.dateOfBirth?.toDate?.() || new Date(),
        },
        employmentInfo: {
          ...doc.data().employmentInfo,
          hireDate: doc.data().employmentInfo.hireDate?.toDate?.() || new Date(),
          terminationDate: doc.data().employmentInfo.terminationDate?.toDate?.() || null,
        },
        documents: {
          ...doc.data().documents,
          passport: {
            ...doc.data().documents.passport,
            issueDate: doc.data().documents.passport.issueDate?.toDate?.() || new Date(),
            expiryDate: doc.data().documents.passport.expiryDate?.toDate?.() || new Date(),
          },
          qatarId: {
            ...doc.data().documents.qatarId,
            issueDate: doc.data().documents.qatarId.issueDate?.toDate?.() || new Date(),
            expiryDate: doc.data().documents.qatarId.expiryDate?.toDate?.() || new Date(),
          },
        },
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
      })) as Employee[];
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw new Error('Failed to fetch employees');
    }
  }

  async getEmployeeById(id: string): Promise<Employee> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          personalInfo: {
            ...data.personalInfo,
            dateOfBirth: data.personalInfo.dateOfBirth?.toDate?.() || new Date(),
          },
          employmentInfo: {
            ...data.employmentInfo,
            hireDate: data.employmentInfo.hireDate?.toDate?.() || new Date(),
            terminationDate: data.employmentInfo.terminationDate?.toDate?.() || null,
          },
          documents: {
            ...data.documents,
            passport: {
              ...data.documents.passport,
              issueDate: data.documents.passport.issueDate?.toDate?.() || new Date(),
              expiryDate: data.documents.passport.expiryDate?.toDate?.() || new Date(),
            },
            qatarId: {
              ...data.documents.qatarId,
              issueDate: data.documents.qatarId.issueDate?.toDate?.() || new Date(),
              expiryDate: data.documents.qatarId.expiryDate?.toDate?.() || new Date(),
            },
          },
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date(),
        } as Employee;
      } else {
        throw new Error('Employee not found');
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw new Error('Failed to fetch employee');
    }
  }

  async createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    try {
      const employeeData = {
        ...employee,
        personalInfo: {
          ...employee.personalInfo,
          dateOfBirth: Timestamp.fromDate(employee.personalInfo.dateOfBirth),
        },
        employmentInfo: {
          ...employee.employmentInfo,
          hireDate: Timestamp.fromDate(employee.employmentInfo.hireDate),
          terminationDate: employee.employmentInfo.terminationDate 
            ? Timestamp.fromDate(employee.employmentInfo.terminationDate) 
            : null,
        },
        documents: {
          ...employee.documents,
          passport: {
            ...employee.documents.passport,
            issueDate: Timestamp.fromDate(employee.documents.passport.issueDate),
            expiryDate: Timestamp.fromDate(employee.documents.passport.expiryDate),
          },
          qatarId: {
            ...employee.documents.qatarId,
            issueDate: Timestamp.fromDate(employee.documents.qatarId.issueDate),
            expiryDate: Timestamp.fromDate(employee.documents.qatarId.expiryDate),
          },
        },
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, this.collectionName), employeeData);
      
      return {
        id: docRef.id,
        ...employee,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error('Error creating employee:', error);
      throw new Error('Failed to create employee');
    }
  }

  async updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const updateData: any = {
        ...employee,
        updatedAt: Timestamp.now(),
      };

      // Handle date conversions if dates are being updated
      if (employee.personalInfo?.dateOfBirth) {
        updateData.personalInfo = {
          ...updateData.personalInfo,
          dateOfBirth: Timestamp.fromDate(employee.personalInfo.dateOfBirth),
        };
      }

      if (employee.employmentInfo?.hireDate) {
        updateData.employmentInfo = {
          ...updateData.employmentInfo,
          hireDate: Timestamp.fromDate(employee.employmentInfo.hireDate),
        };
      }

      await updateDoc(docRef, updateData);
      
      // Return updated employee
      return await this.getEmployeeById(id);
    } catch (error) {
      console.error('Error updating employee:', error);
      throw new Error('Failed to update employee');
    }
  }

  async deleteEmployee(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw new Error('Failed to delete employee');
    }
  }

  async uploadDocument(file: File, employeeId: string, documentType: string): Promise<string> {
    try {
      const storageRef = ref(storage, `employees/${employeeId}/${documentType}_${Date.now()}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw new Error('Failed to upload document');
    }
  }

  async getEmployeesWithExpiringDocuments(daysAhead: number = 30): Promise<Employee[]> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() + daysAhead);
      
      const employees = await this.getAllEmployees();
      
      return employees.filter(employee => {
        const passportExpiry = employee.documents.passport.expiryDate;
        const qatarIdExpiry = employee.documents.qatarId.expiryDate;
        
        return passportExpiry <= cutoffDate || qatarIdExpiry <= cutoffDate;
      });
    } catch (error) {
      console.error('Error fetching employees with expiring documents:', error);
      throw new Error('Failed to fetch employees with expiring documents');
    }
  }
}

export const employeeService = new EmployeeService();
