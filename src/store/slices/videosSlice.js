import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../api/apiRequest';

const initialState ={
    allVideos: [],         // Все видео с бэка (для ленивой загрузки)
    channelVideos: [],         // Видео, где id_owner === userId
    watchHistory: [],     // История просмотров
    subscriptions: [],    // Видео с каналов, на которые подписан
    playlists: [],        // Плейлисты
    searchVideos: [],       // Видео по запросу
    currentVideo: {},
    reactionForCurrentVideo: {},

    isLoading: false,      // Лоадер
    error: null,
    
    recommendationsStatus: {
      isLoading: false,      // Лоадер
      error: null,
    },
    searchStatus: {
      isLoading: false,      // Лоадер
      error: null,
    },
};

export const fetchVideos = createAsyncThunk(
    'videos/fetchVideos',
    async ({ page, limit }) => {
        const response = await apiRequest('/main/videos', 'POST', { page, limit });
        return response.videos;
    }
);

export const fetchVideoByUrl = createAsyncThunk(
  'videos/fetchVideoByUrl',
  async (video_url) => {
      const response = await apiRequest(`/main/videos/${video_url}`, 'GET');
      return [response.video, response.reaction];
  }
);

export const fetchVideosFromChannel = createAsyncThunk(
    'videos/fetchVideosFromChannel',
    async ({ tagname, page, limit }) => {
      const response = await apiRequest(`/main/videos/channel/${tagname}`, 'POST', { page, limit });
      return response.myVideos;
  }
);

export const fetchVideosFromSubChannels = createAsyncThunk(
  'videos/fetchVideosFromSubChannels',
  async ({ page, limit }) => {
    const response = await apiRequest(`/main/videos/channels`, 'POST', { page, limit });
    return response.videos;
}
);

export const fetchHistory = createAsyncThunk(
  'videos/fetchHistory',
  async ({ page, limit }) => {
      const response = await apiRequest(`/main/history`, 'POST', { page, limit });
      return response.videos;
  }
);

export const fetchVideosFromPlaylist = createAsyncThunk(
  'videos/fetchVideosFromPlaylist',
  async (playlist_url, { page, limit }) => {
      const response = await apiRequest(`/main/playlists/${playlist_url}`, 'POST', { page, limit });
      return response.videos;
  }
);

export const fetchSearchVideos = createAsyncThunk(
  'videos/fetchSearchVideos',
  async ({ searchQuery, page, limit }) => {
      const response = await apiRequest(`/main/videos/search/${searchQuery}`, 'POST', { page, limit });
      return response.videos;
  }
);

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        clearVideos: (state) => {
          state.allVideos = []; // Очищаем массив при смене страницы
        },
        removeHistoryVideo: (state, action) => {
          state.watchHistory = state.watchHistory.filter(video => video.id !== action.payload);
        },
        clearHistoryVideos: (state, action) => {
          state.watchHistory = [];
        },
        clearPlaylist: (state) => {
          state.playlists = [];
        },
        clearChannelVideos: (state) => {
          state.channelVideos = [];
        },
        clearCurrentVideo: (state) => {
          state.currentVideo = {};
        },
        clearVideosFromSubChannel: (state) => {
          state.subscriptions = [];
        },
        clearSearchVideos: (state) => {
          state.searchVideos = [];
        },
        clearVideoByUrl: (state, action) => {
          state.allVideos = state.allVideos.filter(video => video.url !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
          // ✅ Подгрузка всех видео (ленивая загрузка)
          .addCase(fetchVideos.pending, (state) => {
            state.recommendationsStatus.isLoading = true;
          })
          .addCase(fetchVideos.fulfilled, (state, action) => {
            state.recommendationsStatus.isLoading = false;
            const newVideos = action.payload;
            // Фильтруем новые видео, чтобы не добавлять уже существующие
            const uniqueVideos = newVideos.filter(video => 
                !state.allVideos.some(existingVideo => existingVideo.id === video.id)
            );
            const shuffledVideos = [...state.allVideos, ...uniqueVideos]
            // .sort(() => Math.random() - 0.5)
            state.allVideos = shuffledVideos;
          })
          .addCase(fetchVideos.rejected, (state, action) => {
            state.recommendationsStatus.isLoading = false;
            state.recommendationsStatus.error = action.error.message;
          })
    
          // ✅ Мои видео
          .addCase(fetchVideosFromChannel.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchVideosFromChannel.fulfilled, (state, action) => {
            state.isLoading = false;
            const newVideos = action.payload;
            // Фильтруем новые видео, чтобы не добавлять уже существующие
            const uniqueVideos = newVideos.filter(video => 
                !state.channelVideos.some(existingVideo => existingVideo.id === video.id)
            );
            state.channelVideos = [...state.channelVideos, ...uniqueVideos]; // Лениво загружаем видео
          })
          .addCase(fetchVideosFromChannel.rejected, (state, action) => {
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
            
            const uniqueVideos = newVideos.filter(video => 
              !state.watchHistory.some(existingVideo => existingVideo.id === video.id)
            );

            const combined = [...state.watchHistory, ...uniqueVideos];
            state.watchHistory = combined.sort((a, b) => new Date(b.watched_at) - new Date(a.watched_at));
          })
          .addCase(fetchHistory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })

          // Подгрузка плейлистов (ленивая загрузка)
          .addCase(fetchVideosFromPlaylist.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchVideosFromPlaylist.fulfilled, (state, action) => {
            state.isLoading = false;
            const newVideos = action.payload;
            // Фильтруем новые видео, чтобы не добавлять уже существующие
            if (!action.payload) return;
            const uniqueVideos = newVideos.filter(video => 
                !state.playlists.some(existingVideo => existingVideo.id === video.id)
            );
            state.playlists = [...state.playlists, ...uniqueVideos]; // Лениво загружаем видео
          })
          .addCase(fetchVideosFromPlaylist.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
          // Подгрузка плейлистов (ленивая загрузка)
          .addCase(fetchVideoByUrl.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchVideoByUrl.fulfilled, (state, action) => {
            state.isLoading = false;
            const currentVideo = action.payload[0];
            const reactionForCurrentVideo = action.payload[1];
            // Фильтруем новые видео, чтобы не добавлять уже существующие
            if (!action.payload) return;
            state.currentVideo = {...currentVideo}; // Лениво загружаем видео
            state.reactionForCurrentVideo = {...reactionForCurrentVideo}; // Лениво загружаем видео
          })
          .addCase(fetchVideoByUrl.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })

          .addCase(fetchVideosFromSubChannels.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchVideosFromSubChannels.fulfilled, (state, action) => {
            state.isLoading = false;
            const newVideos = action.payload;
            const uniqueVideos = newVideos.filter(video => 
                !state.subscriptions.some(existingVideo => existingVideo.id === video.id)
            );
            
            const combined = [...state.subscriptions, ...uniqueVideos]; // Лениво загружаем видео
            state.subscriptions = combined.sort((a, b) => new Date(b.load_date) - new Date(a.load_date));
          })
          .addCase(fetchVideosFromSubChannels.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })

          .addCase(fetchSearchVideos.pending, (state) => {
            state.searchStatus.isLoading = true;
          })
          .addCase(fetchSearchVideos.fulfilled, (state, action) => {
            state.searchStatus.isLoading = false;
            const newVideos = action.payload;
            const uniqueVideos = newVideos.filter(video => 
                !state.searchVideos.some(existingVideo => existingVideo.id === video.id)
            );
            
            const combined = [...state.searchVideos, ...uniqueVideos]; // Лениво загружаем видео
            state.searchVideos = combined.sort((a, b) => new Date(b.views) - new Date(a.views));
          })
          .addCase(fetchSearchVideos.rejected, (state, action) => {
            state.searchStatus.isLoading = false;
            state.searchStatus.error = action.error.message;
          })
      }
    });

export const { clearVideos, clearPlaylist, clearHistoryVideos, removeHistoryVideo, clearChannelVideos, clearCurrentVideo, clearVideosFromSubChannel, clearSearchVideos, clearVideoByUrl } = videosSlice.actions;

export default videosSlice.reducer;
    