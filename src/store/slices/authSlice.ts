import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Mock authentication service (to be replaced with actual authentication API)
const mockLogin = async (email: string, password: string): Promise<User | null> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For development, always return a mock user
  return {
    id: uuidv4(),
    email,
    firstName: 'Test',
    lastName: 'User',
    profilePicture: 'https://i.pravatar.cc/150',
    createdAt: new Date(),
  };
};

const mockRegister = async (email: string, password: string, firstName: string, lastName: string): Promise<User | null> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For development, create and return a mock user
  return {
    id: uuidv4(),
    email,
    firstName,
    lastName,
    profilePicture: undefined,
    createdAt: new Date(),
  };
};

// Async thunks for authentication actions
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await mockLogin(email, password);
      
      if (!user) {
        return rejectWithValue('Invalid credentials');
      }
      
      // Store auth token in AsyncStorage
      await AsyncStorage.setItem('auth_token', 'mock_token_' + user.id);
      
      return user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    { email, password, firstName, lastName }: 
    { email: string; password: string; firstName: string; lastName: string }, 
    { rejectWithValue }
  ) => {
    try {
      const user = await mockRegister(email, password, firstName, lastName);
      
      if (!user) {
        return rejectWithValue('Registration failed');
      }
      
      // Store auth token in AsyncStorage
      await AsyncStorage.setItem('auth_token', 'mock_token_' + user.id);
      
      return user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Remove auth token from AsyncStorage
      await AsyncStorage.removeItem('auth_token');
      return null;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

// Check if user is authenticated (has a valid token)
export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      
      if (!token) {
        return null;
      }
      
      // In a real app, validate the token with the backend
      // For now, just mock a user based on token
      const userId = token.replace('mock_token_', '');
      
      return {
        id: userId,
        email: 'user@example.com',
        firstName: 'Test',
        lastName: 'User',
        createdAt: new Date(),
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Register cases
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Logout cases
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
    
    // Check auth cases
    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearErrors, updateUser } = authSlice.actions;

export default authSlice.reducer; 