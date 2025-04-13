import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import videosReducer from './slices/videosSlice';
import playlistsReducer from './slices/playlistsSlice';
import channelsReducer from './slices/channelsSlice'
import commentsReducer from './slices/commentsSlice'
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,  // Добавление редьюсера для пользователя в store
        videos: videosReducer,
        playlists: playlistsReducer,
        channels: channelsReducer,
        comments: commentsReducer,
        ui: uiReducer,
    },
});