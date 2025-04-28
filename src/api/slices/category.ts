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
        } catch (error:any) {
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
            });
    },
});

export default categorySlice.reducer;
