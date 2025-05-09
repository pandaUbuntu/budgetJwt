import axios from '../axios'; 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionType } from '../../types/type';

interface TransactionTypeState {
    transactionType: TransactionType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: TransactionTypeState = {
    transactionType: [],
    isLoading: false,
    error: null,
};

const SLICE_URL = 'transaction-type';

export const getTransactionTypes = createAsyncThunk(
    'transactionType/getAll',
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

const transactionTypeSlice = createSlice({
    name: 'transactionType',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTransactionTypes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getTransactionTypes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactionType = action.payload;
            })
            .addCase(getTransactionTypes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default transactionTypeSlice.reducer;
