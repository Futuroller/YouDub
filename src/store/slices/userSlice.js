import { createSlice, isAction } from "@reduxjs/toolkit";

const initialState ={
    id: null,
    username: '',
    email: '',
    role: '',
    is__activated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, ...action.payload };
        },
        logout: () => {
            return { id: null, username: '', email: '', role: '', is__activated: false };
        },
    },
});

export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer;