// Date formatting utilities
export const formatDate = (date: Date | string, locale = 'en-US'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (date: Date | string, locale = 'en-US'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Currency formatting
export const formatCurrency = (amount: number, currency = 'QAR', locale = 'en-QA'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Document expiry checking
export const isDocumentExpiringSoon = (expiryDate: Date, daysAhead = 30): boolean => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= daysAhead && diffDays >= 0;
};

export const isDocumentExpired = (expiryDate: Date): boolean => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  return expiry < today;
};

// File size formatting
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Phone number formatting
export const formatPhoneNumber = (phoneNumber: string, countryCode = '+974'): string => {
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Add country code if not present
  if (!phoneNumber.startsWith('+')) {
    return `${countryCode} ${cleaned}`;
  }
  
  return phoneNumber;
};

// ID number validation (Qatar ID format)
export const validateQatarId = (id: string): boolean => {
  // Qatar ID should be 11 digits
  const cleaned = id.replace(/\D/g, '');
  return cleaned.length === 11 && /^\d{11}$/.test(cleaned);
};

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate employee ID
export const generateEmployeeId = (department: string, count: number): string => {
  const deptCode = department.substring(0, 3).toUpperCase();
  const paddedCount = count.toString().padStart(4, '0');
  return `${deptCode}${paddedCount}`;
};

// Calculate age from date of birth
export const calculateAge = (dateOfBirth: Date): number => {
  const today = new Date();
  const birth = new Date(dateOfBirth);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

// Get file extension
export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
};

// Check if file is image
export const isImageFile = (filename: string): boolean => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const extension = getFileExtension(filename);
  return imageExtensions.includes(extension);
};

// Check if file is PDF
export const isPdfFile = (filename: string): boolean => {
  return getFileExtension(filename) === 'pdf';
};

// Generate random ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Debounce function
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Convert snake_case to Title Case
export const snakeToTitle = (str: string): string => {
  return str
    .split('_')
    .map(word => capitalize(word))
    .join(' ');
};
