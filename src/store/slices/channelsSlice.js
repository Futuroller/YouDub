import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../api/apiRequest';

const initialState = {
  allChannels: [],
  subscribedChannels: [],
  
  status: {
      isLoading: false,
      error: null,
      success: false
  }
};

export const fetchSubscribedChannels = createAsyncThunk(
    'channels/fetchChannels',
    async () => {
        const response = await apiRequest('/main/channels', 'GET');
        return response.channels;
    }
);

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        clearChannels: (state) => {
            state.allChannels = []; // Очищаем массив при смене страницы
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchSubscribedChannels.pending, (state) => {
            state.status.isLoading = true;
            state.status.error = null; 
        })
        .addCase(fetchSubscribedChannels.fulfilled, (state, action) => {
            state.status.isLoading = false;
            state.status.success = true;
            const uniqueChannels = action.payload.filter(playlist =>
                !state.subscribedChannels.some(existing => existing.id === playlist.id)
            );
            state.subscribedChannels = [...state.subscribedChannels, ...uniqueChannels];
        })
        .addCase(fetchSubscribedChannels.rejected, (state, action) => {
            state.status.isLoading = false;
            state.status.error = action.payload || 'Ошибка при загрузке каналов';
        });
      }
    });

export const { clearChannels } = channelsSlice.actions;

export default channelsSlice.reducer;