import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      id: userCredential.user.uid,
      email: userCredential.user.email!,
      displayName: userCredential.user.displayName || 'User',
      role: 'admin' as const, // This would typically come from Firestore
      permissions: ['read', 'write', 'admin'],
      lastLogin: new Date(),
      isActive: true,
      createdAt: new Date(),
    };
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
});

// Auth state listener
export const initializeAuth = createAsyncThunk('auth/initialize', async () => {
  return new Promise<User | null>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({
          id: user.uid,
          email: user.email!,
          displayName: user.displayName || 'User',
          role: 'admin' as const,
          permissions: ['read', 'write', 'admin'],
          lastLogin: new Date(),
          isActive: true,
          createdAt: new Date(),
        });
      } else {
        resolve(null);
      }
    });
  });
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      // Initialize auth
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.loading = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
