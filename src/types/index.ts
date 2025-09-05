// Employee related types
export interface Employee {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    nationality: string;
    address: string;
  };
  employmentInfo: {
    employeeId: string;
    jobTitle: string;
    department: string;
    hireDate: Date;
    terminationDate?: Date;
    employmentStatus: 'active' | 'terminated' | 'suspended';
    baseSalary: number;
    currency: string;
  };
  documents: {
    passport: {
      number: string;
      issuingCountry: string;
      issueDate: Date;
      expiryDate: Date;
      documentUrl?: string;
    };
    qatarId: {
      number: string;
      issueDate: Date;
      expiryDate: Date;
      documentUrl?: string;
    };
    profilePhoto?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Salary and Transaction types
export interface SalaryTransaction {
  id: string;
  employeeId: string;
  type: 'salary' | 'advance' | 'bonus' | 'deduction';
  amount: number;
  currency: string;
  description: string;
  transactionDate: Date;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'cancelled';
  approvedBy?: string;
  createdAt: Date;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  period: {
    month: number;
    year: number;
  };
  salary: {
    base: number;
    allowances: number;
    overtime: number;
    bonus: number;
    totalGross: number;
  };
  deductions: {
    tax: number;
    insurance: number;
    advance: number;
    other: number;
    totalDeductions: number;
  };
  netPay: number;
  paymentDate: Date;
  status: 'draft' | 'approved' | 'paid';
  createdAt: Date;
}

// Customer types
export interface Customer {
  id: string;
  companyName: string;
  contactPerson: {
    name: string;
    email: string;
    phone: string;
    position: string;
  };
  address: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  businessInfo: {
    industry: string;
    taxNumber: string;
    commercialRegister: string;
    establishedDate: Date;
  };
  contractInfo: {
    contractNumber: string;
    startDate: Date;
    endDate?: Date;
    status: 'active' | 'expired' | 'terminated';
    services: string[];
  };
  financialInfo: {
    creditLimit: number;
    paymentTerms: string;
    outstandingBalance: number;
    totalPaid: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Invoice and Receipt types
export interface Invoice {
  id: string;
  customerId: string;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  paymentDate?: Date;
  notes?: string;
  createdAt: Date;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Notification types
export interface Notification {
  id: string;
  type: 'document_expiry' | 'payment_due' | 'system' | 'payroll';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetUsers: string[];
  relatedEntityId?: string;
  relatedEntityType?: string;
  isRead: boolean;
  scheduledDate?: Date;
  createdAt: Date;
}

// User and Authentication types
export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'admin' | 'hr' | 'finance' | 'viewer';
  permissions: string[];
  lastLogin: Date;
  isActive: boolean;
  createdAt: Date;
}

// Cash Flow types
export interface CashFlowEntry {
  id: string;
  type: 'inflow' | 'outflow';
  category: 'salary' | 'customer_payment' | 'advance' | 'expense' | 'other';
  amount: number;
  currency: string;
  description: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
  transactionDate: Date;
  createdBy: string;
  createdAt: Date;
}

// Dashboard and Analytics types
export interface DashboardStats {
  employees: {
    total: number;
    active: number;
    terminated: number;
    documentsExpiringSoon: number;
  };
  payroll: {
    monthlyTotal: number;
    pendingPayments: number;
    advancesOutstanding: number;
  };
  customers: {
    total: number;
    active: number;
    outstandingInvoices: number;
    totalOutstanding: number;
  };
  cashFlow: {
    currentBalance: number;
    monthlyInflow: number;
    monthlyOutflow: number;
    projectedBalance: number;
  };
}

// Form validation types
export interface FormErrors {
  [key: string]: string | FormErrors;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
