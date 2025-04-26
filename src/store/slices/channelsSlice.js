import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../api/apiRequest';

const initialState = {
  allChannels: [],
  subscribedChannels: [],
  currentChannel: {},
  
  subChannelsStatus: {
      isLoading: false,
      error: null,
      success: false
  },
  currentChannelStatus: {
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

export const fetchChannelByTagname = createAsyncThunk(
    'channels/fetchChannelByTagname',
    async (tagname) => {
        const response = await apiRequest(`/main/channels/${tagname}`, 'GET');
        return response.channel;
    }
);

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        clearChannels: (state) => {
            state.allChannels = [];
        },
        clearCurrentChannel: (state) => {
            state.currentChannel = {};
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchSubscribedChannels.pending, (state) => {
            state.subChannelsStatus.isLoading = true;
            state.subChannelsStatus.error = null; 
        })
        .addCase(fetchSubscribedChannels.fulfilled, (state, action) => {
            state.subChannelsStatus.isLoading = false;
            state.subChannelsStatus.success = true;
            const channels = action.payload;
            state.subscribedChannels = channels.sort((a, b) => new Date(b.subscribed_at) - new Date(a.subscribed_at));
        })
        .addCase(fetchSubscribedChannels.rejected, (state, action) => {
            state.subChannelsStatus.isLoading = false;
            state.subChannelsStatus.error = action.payload || 'Ошибка при загрузке каналов';
        })

        .addCase(fetchChannelByTagname.pending, (state) => {
            state.currentChannelStatus.isLoading = true;
            state.currentChannelStatus.error = null; 
        })
        .addCase(fetchChannelByTagname.fulfilled, (state, action) => {
            state.currentChannelStatus.isLoading = false;
            state.currentChannelStatus.success = true;
            const channel = action.payload;
            state.currentChannel = {...channel};
        })
        .addCase(fetchChannelByTagname.rejected, (state, action) => {
            state.currentChannelStatus.isLoading = false;
            state.currentChannelStatus.error = action.payload || 'Ошибка при загрузке канала';
        });
      }
    });

export const { clearChannels, clearCurrentChannel } = channelsSlice.actions;

export default channelsSlice.reducer;