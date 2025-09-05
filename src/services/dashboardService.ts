import { DashboardStats } from '../types';
import { employeeService } from './employeeService';
import { customerService } from './customerService';
import { payrollService } from './payrollService';

export class DashboardService {
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // In a real application, these would be optimized queries
      const [employees, customers, payrollRecords, transactions] = await Promise.all([
        employeeService.getAllEmployees(),
        customerService.getAllCustomers(),
        payrollService.getPayrollRecords(),
        payrollService.getTransactions(),
      ]);

      const expiringDocuments = await employeeService.getEmployeesWithExpiringDocuments(30);

      const stats: DashboardStats = {
        employees: {
          total: employees.length,
          active: employees.filter(e => e.employmentInfo.employmentStatus === 'active').length,
          terminated: employees.filter(e => e.employmentInfo.employmentStatus === 'terminated').length,
          documentsExpiringSoon: expiringDocuments.length,
        },
        payroll: {
          monthlyTotal: this.calculateMonthlyPayroll(payrollRecords),
          pendingPayments: payrollRecords.filter(p => p.status === 'approved').length,
          advancesOutstanding: this.calculateOutstandingAdvances(transactions),
        },
        customers: {
          total: customers.length,
          active: customers.filter(c => c.contractInfo.status === 'active').length,
          outstandingInvoices: 0, // Would calculate from invoices collection
          totalOutstanding: 0, // Would calculate from invoices collection
        },
        cashFlow: {
          currentBalance: this.calculateCurrentBalance(transactions),
          monthlyInflow: this.calculateMonthlyInflow(transactions),
          monthlyOutflow: this.calculateMonthlyOutflow(transactions),
          projectedBalance: 0, // Would calculate based on projected income/expenses
        },
      };

      return stats;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw new Error('Failed to fetch dashboard statistics');
    }
  }

  private calculateMonthlyPayroll(payrollRecords: any[]): number {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return payrollRecords
      .filter(record => 
        record.period.month === currentMonth && 
        record.period.year === currentYear
      )
      .reduce((total, record) => total + record.netPay, 0);
  }

  private calculateOutstandingAdvances(transactions: any[]): number {
    return transactions
      .filter(t => t.type === 'advance' && t.status === 'completed')
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  private calculateCurrentBalance(transactions: any[]): number {
    const inflows = transactions
      .filter(t => t.type === 'salary' || t.type === 'bonus')
      .reduce((total, t) => total + t.amount, 0);
    
    const outflows = transactions
      .filter(t => t.type === 'advance' || t.type === 'deduction')
      .reduce((total, t) => total + t.amount, 0);
    
    return inflows - outflows;
  }

  private calculateMonthlyInflow(transactions: any[]): number {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return transactions
      .filter(t => {
        const transactionDate = new Date(t.transactionDate);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear &&
               (t.type === 'salary' || t.type === 'bonus');
      })
      .reduce((total, t) => total + t.amount, 0);
  }

  private calculateMonthlyOutflow(transactions: any[]): number {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return transactions
      .filter(t => {
        const transactionDate = new Date(t.transactionDate);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear &&
               (t.type === 'advance' || t.type === 'deduction');
      })
      .reduce((total, t) => total + t.amount, 0);
  }
}

export const dashboardService = new DashboardService();
