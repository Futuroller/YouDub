import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../api/apiRequest';

const initialState = {
  allPlaylists: [],
  otherPlaylists: [],
  watchLaterPlaylist: null,
  likedPlaylist: null,
  
  status: {
      isLoading: false,
      error: null,
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

const playlistsSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        clearPlaylists: (state) => {
            state.allPlaylists = []; // Очищаем массив при смене страницы
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
        });
      }
    });

export const { clearPlaylists } = playlistsSlice.actions;

export default playlistsSlice.reducer;