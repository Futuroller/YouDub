import { createSlice, isAction } from "@reduxjs/toolkit";

const initialState ={

};

const myVideoSlice = createSlice({
    name: 'myVideo',
    initialState,
    reducers: {
        loadVideos: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const loadVideos = myVideoSlice.actions;
export default myVideoSlice.reducer;