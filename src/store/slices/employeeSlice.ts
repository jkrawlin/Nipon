import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from '../../types';
import { employeeService } from '../../services/employeeService';

interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  loading: boolean;
  error: string | null;
  expiringDocuments: Employee[];
}

const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
  expiringDocuments: [],
};

// Async thunks
export const fetchEmployees = createAsyncThunk(
  'employees/fetchAll',
  async () => {
    return await employeeService.getAllEmployees();
  }
);

export const fetchEmployee = createAsyncThunk(
  'employees/fetchOne',
  async (id: string) => {
    return await employeeService.getEmployeeById(id);
  }
);

export const createEmployee = createAsyncThunk(
  'employees/create',
  async (employee: Omit<Employee, 'id'>) => {
    return await employeeService.createEmployee(employee);
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/update',
  async ({ id, employee }: { id: string; employee: Partial<Employee> }) => {
    return await employeeService.updateEmployee(id, employee);
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/delete',
  async (id: string) => {
    await employeeService.deleteEmployee(id);
    return id;
  }
);

export const fetchExpiringDocuments = createAsyncThunk(
  'employees/fetchExpiringDocuments',
  async () => {
    return await employeeService.getEmployeesWithExpiringDocuments();
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
        state.error = null;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      })
      // Fetch single employee
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.selectedEmployee = action.payload;
      })
      // Create employee
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      // Update employee
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      // Delete employee
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      })
      // Expiring documents
      .addCase(fetchExpiringDocuments.fulfilled, (state, action) => {
        state.expiringDocuments = action.payload;
      });
  },
});

export const { clearError, clearSelectedEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
