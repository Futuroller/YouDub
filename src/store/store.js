import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import myVideoReducer from './slices/myVideoSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,  // Добавление редьюсера для пользователя в store
        myVideo: myVideoReducer,
    },
});