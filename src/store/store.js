import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import videosReducer from './slices/videosSlice';
import playlistsReducer from './slices/playlistsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,  // Добавление редьюсера для пользователя в store
        videos: videosReducer,
        playlists: playlistsReducer
    },
});