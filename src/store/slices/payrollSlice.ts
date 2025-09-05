import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PayrollRecord, SalaryTransaction } from '../../types';
import { payrollService } from '../../services/payrollService';

interface PayrollState {
  payrollRecords: PayrollRecord[];
  transactions: SalaryTransaction[];
  loading: boolean;
  error: string | null;
}

const initialState: PayrollState = {
  payrollRecords: [],
  transactions: [],
  loading: false,
  error: null,
};

export const fetchPayrollRecords = createAsyncThunk(
  'payroll/fetchRecords',
  async () => {
    return await payrollService.getPayrollRecords();
  }
);

export const fetchTransactions = createAsyncThunk(
  'payroll/fetchTransactions',
  async () => {
    return await payrollService.getTransactions();
  }
);

const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayrollRecords.fulfilled, (state, action) => {
        state.payrollRecords = action.payload;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
      });
  },
});

export const { clearError } = payrollSlice.actions;
export default payrollSlice.reducer;
