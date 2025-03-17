import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../api/apiRequest';

const initialState = {
  allPlaylists: [],
  otherPlaylists: [],
  historyPlaylist: [],
  watchLaterPlaylist: [],
  
  status: {
      isLoading: false,
      error: null,
      success: false
  }
};

export const fetchPlaylists = createAsyncThunk(
    'playlists/fetchPlaylists',
    async () => {
        const response = await apiRequest('/main/playlists', 'GET');
        console.log(response.playlists);
        return response.playlists;
    }
);

const playlistsSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        clearPlaylists: (state) => {
            state.allPlaylists = []; // Очищаем массив при смене страницы
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPlaylists.pending, (state) => {
            state.status.isLoading = true;
            state.status.error = null; 
        })
        .addCase(fetchPlaylists.fulfilled, (state, action) => {
            state.status.isLoading = false;
            state.status.success = true;
            const uniquePlaylists = action.payload.filter(playlist =>
                !state.allPlaylists.some(existing => existing.id === playlist.id)
            );
            state.allPlaylists = [...state.allPlaylists, ...uniquePlaylists];
        })
        .addCase(fetchPlaylists.rejected, (state, action) => {
            state.status.isLoading = false;
            state.status.error = action.payload || 'Ошибка при загрузке плейлистов';
        });
      }
    });

export const { clearPlaylists } = playlistsSlice.actions;

export default playlistsSlice.reducer;