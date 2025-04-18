import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../api/apiRequest';

const initialState = {
  allPlaylists: [],
  otherPlaylists: [],
  watchLaterPlaylist: null,
  likedPlaylist: null,
  currentPlaylist: [],
  status: {
      isLoading: false,
      error: null,
      isLimitedAccess: false,
      success: false
  }
};

export const fetchAllPlaylists = createAsyncThunk(
    'playlists/fetchPlaylists',
    async () => {
        const response = await apiRequest('/main/playlists', 'GET');
        return response.playlists;
    }
);

export const fetchPlaylistByUrl = createAsyncThunk(
    'playlists/fetchPlaylistByUrl',
    async (url, { rejectWithValue }) => {
        const response = await apiRequest(`/main/playlist/${url}`, 'GET');

        if (response.status == 200) {
            return response.playlist;
        } else {
            return rejectWithValue(response.message);
        }
    }
);

const playlistsSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        clearPlaylists: (state) => {
            state.allPlaylists = []; // Очищаем массив при смене страницы
        },
        clearCurrentPlaylist: (state) => {
            state.currentPlaylist = [];
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllPlaylists.pending, (state) => {
            state.status.isLoading = true;
            state.status.error = null; 
        })
        .addCase(fetchAllPlaylists.fulfilled, (state, action) => {
            state.status.isLoading = false;
            state.status.success = true;
            state.allPlaylists = action.payload;
            state.watchLaterPlaylist = action.payload.find(p => p.name === 'Смотреть позже') || null;
            state.likedPlaylist = action.payload.find(p => p.name === 'Понравившиеся') || null;
        })
        .addCase(fetchAllPlaylists.rejected, (state, action) => {
            state.status.isLoading = false;
            state.status.error = action.payload || 'Ошибка при загрузке плейлистов';
        })
        //по url
        .addCase(fetchPlaylistByUrl.pending, (state) => {
            state.status.isLoading = true;
            state.status.error = null; 
        })
        .addCase(fetchPlaylistByUrl.fulfilled, (state, action) => {
            state.status.isLoading = false;
            state.status.success = true;
            state.currentPlaylist = action.payload || [];
        })
        .addCase(fetchPlaylistByUrl.rejected, (state, action) => {
            state.status.isLoading = false;
            state.status.error = action.payload || 'Ошибка при загрузке плейлиста';
        })
      }
    });

export const { clearPlaylists, clearCurrentPlaylist } = playlistsSlice.actions;

export default playlistsSlice.reducer;