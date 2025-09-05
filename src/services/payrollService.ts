import { 
  collection, 
  getDocs, 
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { PayrollRecord, SalaryTransaction } from '../types';

export class PayrollService {
  async getPayrollRecords(): Promise<PayrollRecord[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'payroll'), orderBy('createdAt', 'desc'))
      );
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        paymentDate: doc.data().paymentDate?.toDate?.() || new Date(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      })) as PayrollRecord[];
    } catch (error) {
      console.error('Error fetching payroll records:', error);
      throw new Error('Failed to fetch payroll records');
    }
  }

  async getTransactions(): Promise<SalaryTransaction[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'transactions'), orderBy('transactionDate', 'desc'))
      );
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        transactionDate: doc.data().transactionDate?.toDate?.() || new Date(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      })) as SalaryTransaction[];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Failed to fetch transactions');
    }
  }
}

export const payrollService = new PayrollService();
