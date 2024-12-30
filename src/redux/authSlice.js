import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    localStorage.setItem('jwtToken', response.data.data.jwtToken);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('jwtToken'); // Get token from localStorage
    if (!token) {
      throw new Error('No token found in localStorage');
    }
    const response = await axiosInstance.get('/auth/current-user', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('jwtToken') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false; // Reset loading state
      localStorage.removeItem('jwtToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data && action.payload.data.user) {
          state.user = action.payload.data.user;
          state.token = action.payload.data.jwtToken;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : { errorMessage: 'Login failed' };
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data && action.payload.data.user) {
          state.user = action.payload.data.user;
        }
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : { errorMessage: 'Failed to fetch user data' };
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
