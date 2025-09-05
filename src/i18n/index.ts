import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const enTranslations = {
  common: {
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    print: 'Print',
  },
  auth: {
    login: 'Login',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    signin: 'Sign In',
  },
  navigation: {
    dashboard: 'Dashboard',
    employees: 'Employees',
    customers: 'Customers',
    payroll: 'Payroll',
    invoices: 'Invoices',
    notifications: 'Notifications',
    cashFlow: 'Cash Flow',
  },
  employees: {
    title: 'Employee Management',
    addEmployee: 'Add Employee',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    jobTitle: 'Job Title',
    salary: 'Salary',
    status: 'Status',
  },
  dashboard: {
    welcome: 'Welcome to Qatar Payroll System',
    totalEmployees: 'Total Employees',
    activeCustomers: 'Active Customers',
    monthlyPayroll: 'Monthly Payroll',
    expiringDocuments: 'Expiring Documents',
  },
};

// Arabic translations
const arTranslations = {
  common: {
    loading: 'جاري التحميل...',
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    add: 'إضافة',
    search: 'بحث',
    filter: 'تصفية',
    export: 'تصدير',
    print: 'طباعة',
  },
  auth: {
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    signin: 'دخول',
  },
  navigation: {
    dashboard: 'لوحة التحكم',
    employees: 'الموظفين',
    customers: 'العملاء',
    payroll: 'كشوف المرتبات',
    invoices: 'الفواتير',
    notifications: 'الإشعارات',
    cashFlow: 'التدفق النقدي',
  },
  employees: {
    title: 'إدارة الموظفين',
    addEmployee: 'إضافة موظف',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    jobTitle: 'المنصب',
    salary: 'المرتب',
    status: 'الحالة',
  },
  dashboard: {
    welcome: 'مرحباً بكم في نظام رواتب قطر',
    totalEmployees: 'إجمالي الموظفين',
    activeCustomers: 'العملاء النشطين',
    monthlyPayroll: 'رواتب الشهر',
    expiringDocuments: 'الوثائق منتهية الصلاحية',
  },
};

const resources = {
  en: {
    translation: enTranslations,
  },
  ar: {
    translation: arTranslations,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
