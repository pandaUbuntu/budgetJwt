import axios from '../axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/type';

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
    token: localStorage.getItem('token') || null,
};

const SLICE_URL = 'auth';

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const response:any = await axios.post(`/${SLICE_URL}/register`, userData);
            localStorage.setItem('token', response.data.access_token);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response:any = await axios.post(`/${SLICE_URL}/login`, userData);
            localStorage.setItem('token', response.data.access_token);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default authSlice.reducer;
