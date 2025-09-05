import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Customer } from '../../types';
import { customerService } from '../../services/customerService';

interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchCustomers = createAsyncThunk(
  'customers/fetchAll',
  async () => {
    return await customerService.getAllCustomers();
  }
);

export const createCustomer = createAsyncThunk(
  'customers/create',
  async (customer: Omit<Customer, 'id'>) => {
    return await customerService.createCustomer(customer);
  }
);

export const updateCustomer = createAsyncThunk(
  'customers/update',
  async ({ id, customer }: { id: string; customer: Partial<Customer> }) => {
    return await customerService.updateCustomer(id, customer);
  }
);

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.loading = false;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload);
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.customers.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      });
  },
});

export const { clearError } = customerSlice.actions;
export default customerSlice.reducer;
