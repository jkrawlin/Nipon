import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Customer } from '../types';

export class CustomerService {
  private collectionName = 'customers';

  async getAllCustomers(): Promise<Customer[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, this.collectionName), orderBy('createdAt', 'desc'))
      );
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        businessInfo: {
          ...doc.data().businessInfo,
          establishedDate: doc.data().businessInfo.establishedDate?.toDate?.() || new Date(),
        },
        contractInfo: {
          ...doc.data().contractInfo,
          startDate: doc.data().contractInfo.startDate?.toDate?.() || new Date(),
          endDate: doc.data().contractInfo.endDate?.toDate?.() || null,
        },
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
      })) as Customer[];
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw new Error('Failed to fetch customers');
    }
  }

  async createCustomer(customer: Omit<Customer, 'id'>): Promise<Customer> {
    try {
      const customerData = {
        ...customer,
        businessInfo: {
          ...customer.businessInfo,
          establishedDate: Timestamp.fromDate(customer.businessInfo.establishedDate),
        },
        contractInfo: {
          ...customer.contractInfo,
          startDate: Timestamp.fromDate(customer.contractInfo.startDate),
          endDate: customer.contractInfo.endDate 
            ? Timestamp.fromDate(customer.contractInfo.endDate) 
            : null,
        },
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, this.collectionName), customerData);
      
      return {
        id: docRef.id,
        ...customer,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error('Failed to create customer');
    }
  }

  async updateCustomer(id: string, customer: Partial<Customer>): Promise<Customer> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const updateData: any = {
        ...customer,
        updatedAt: Timestamp.now(),
      };

      await updateDoc(docRef, updateData);
      
      // Return updated customer (simplified for this example)
      return { id, ...customer } as Customer;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw new Error('Failed to update customer');
    }
  }
}

export const customerService = new CustomerService();
