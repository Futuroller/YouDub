import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../api/apiRequest';

const initialState ={
    allCategories: [],
};

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await apiRequest('/main/categories', 'GET');
        return response.categories;
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchCategories.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            const categories = action.payload;
            state.allCategories = categories;
          })
          .addCase(fetchCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
      }
    });

export default categoriesSlice.reducer;
    