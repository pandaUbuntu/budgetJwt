import axios from '../axios'; 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction } from '../../types/type';

type TransactionState = {
    transactions: Transaction[];
    isLoading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    transactions: [],
    isLoading: false,
    error: null,
};

const SLICE_URL = 'transactions';

export const createTransaction = createAsyncThunk(
    'transaction/create',
    async (transactionData: { type: string; categoryId: number; value: number, date:string }, { rejectWithValue }) => {
        try {
            const response:any = await axios.post(`/${SLICE_URL}`, transactionData);
            return response.data;
        } 
        catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getTransactions = createAsyncThunk(
    'transaction/getAll',
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

export const deleteTransaction = createAsyncThunk(
    'transaction/delete',
    async (transactionId: number, { rejectWithValue }) => {
        try {
            const response:any = await axios.delete(`/${SLICE_URL}/${transactionId}`);
            return response.data;
        } 
        catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);


const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTransaction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions.push(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            /*.addCase(getTransactions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions = action.payload;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })*/
            .addCase(deleteTransaction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                const transactionId = action.meta.arg; // Get the transaction ID from the meta information
                state.transactions = state.transactions.filter((transaction) => transaction.id !== transactionId);
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default transactionSlice.reducer;
