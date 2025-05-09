import axios from '../axios'; 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../../types/type';

interface CategoryState {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    isLoading: false,
    error: null,
};

const SLICE_URL = 'categories';

export const createCatagory = createAsyncThunk(
    'category/create',
    async (categoryData: { name: string }, { rejectWithValue }) => {
        try {
            const response:any = await axios.post(`/${SLICE_URL}`, categoryData);
            return response.data;
        } 
        catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCategories = createAsyncThunk(
    'category/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response:any = await axios.get(`/${SLICE_URL}`);
            return response.data;
        } 
        catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'category/delete',
    async (categoryId: number, { rejectWithValue }) => {
        try {
            const response:any = await axios.delete(`/${SLICE_URL}/${categoryId}`);
            return response.data;
        } 
        catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCatagory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createCatagory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories.push(action.payload);
            })
            .addCase(createCatagory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = state.categories.filter((category) => category.id !== action.meta.arg);    
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default categorySlice.reducer;
