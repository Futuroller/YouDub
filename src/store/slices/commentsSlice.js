import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../api/apiRequest';

const initialState ={
    allComments: [],
    isLoading: false,
    error: null,
};

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (video_url) => {
        const response = await apiRequest(`/main/comments/${video_url}`, 'GET');
        return response.comments;
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        clearComments: (state) => {
          state.allComments = [];
        },
        removeComment: (state, action) => {
          state.allComments = state.allComments.filter(comment => comment.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchComments.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchComments.fulfilled, (state, action) => {
            state.isLoading = false;
            const comments = action.payload;

            if (!action.payload) return;
            state.allComments = comments.sort((a, b) => new Date(b.comment_date) - new Date(a.comment_date));
          })
          .addCase(fetchComments.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
        }
    });

export const { clearComments, removeComment } = commentsSlice.actions;

export default commentsSlice.reducer;
    