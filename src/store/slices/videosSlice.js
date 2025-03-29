import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../api/apiRequest';

const initialState ={
    allVideos: [],         // Все видео с бэка (для ленивой загрузки)
    myVideos: [],         // Видео, где id_owner === userId
    watchHistory: [],     // История просмотров
    subscriptions: [],    // Видео с каналов, на которые подписан
    playlists: [],        // Плейлисты
    recommended: [],       // Рекомендации
    isLoading: false,      // Лоадер
    error: null,
};

export const fetchVideos = createAsyncThunk(
    'videos/fetchVideos',
    async ({ page, limit }) => {
        const response = await apiRequest('/main/videos', 'POST', { page, limit });
        return response.videos;
    }
);

export const fetchMyVideos = createAsyncThunk(
    'videos/fetchMyVideos',
    async ({ page, limit }) => {
      const response = await apiRequest('/main/videos/my-channel', 'POST', { page, limit });
      return response.myVideos;
  }
)

export const fetchHistory = createAsyncThunk(
  'videos/fetchHistory',
  async ({ page, limit }) => {
      const response = await apiRequest(`/main/history`, 'POST', { page, limit });
      return response.videos;
  }
)

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        clearVideos: (state) => {
          state.allVideos = []; // Очищаем массив при смене страницы
        },
        removeHistoryVideo: (state, action) => {
          state.watchHistory = state.watchHistory.filter(video => video.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
          // ✅ Подгрузка всех видео (ленивая загрузка)
          .addCase(fetchVideos.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchVideos.fulfilled, (state, action) => {
            state.isLoading = false;
            const newVideos = action.payload;
            // Фильтруем новые видео, чтобы не добавлять уже существующие
            const uniqueVideos = newVideos.filter(video => 
                !state.allVideos.some(existingVideo => existingVideo.id === video.id)
            );
            state.allVideos = [...state.allVideos, ...uniqueVideos]; // Лениво загружаем видео
          })
          .addCase(fetchVideos.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
    
          // ✅ Мои видео
          .addCase(fetchMyVideos.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchMyVideos.fulfilled, (state, action) => {
            state.isLoading = false;
            const newVideos = action.payload;
            // Фильтруем новые видео, чтобы не добавлять уже существующие
            const uniqueVideos = newVideos.filter(video => 
                !state.myVideos.some(existingVideo => existingVideo.id === video.id)
            );
            state.myVideos = [...state.myVideos, ...uniqueVideos]; // Лениво загружаем видео
          })
          .addCase(fetchMyVideos.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })

          // ✅ Подгрузка истории просмотра (ленивая загрузка)
          .addCase(fetchHistory.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchHistory.fulfilled, (state, action) => {
            state.isLoading = false;
            const newVideos = action.payload;
            // Фильтруем новые видео, чтобы не добавлять уже существующие
            const uniqueVideos = newVideos.filter(video => 
                !state.watchHistory.some(existingVideo => existingVideo.id === video.id)
            );
            state.watchHistory = [...state.watchHistory, ...uniqueVideos]; // Лениво загружаем видео
          })
          .addCase(fetchHistory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
      }
    });

export const { clearVideos, removeHistoryVideo } = videosSlice.actions;

export default videosSlice.reducer;
    