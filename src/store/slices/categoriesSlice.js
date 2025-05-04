import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../api/apiRequest';

const initialState ={
    allCategories: [],
    usersCategories: [],
};

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await apiRequest('/main/categories', 'GET');
        return response.categories;
    }
);

export const fetchUsersCategories = createAsyncThunk(
  'categories/fetchUsersCategories',
  async () => {
      const response = await apiRequest(`/main/user/categories`, 'GET');
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

          .addCase(fetchUsersCategories.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchUsersCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            const categories = action.payload;
            state.usersCategories = categories;
          })
          .addCase(fetchUsersCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
      }
    });

export default categoriesSlice.reducer;
    