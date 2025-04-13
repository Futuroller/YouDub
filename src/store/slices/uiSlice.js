import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isNavbarCollapsed: false,
    },
    reducers: {
        toggleNavbar(state) {
            state.isNavbarCollapsed = !state.isNavbarCollapsed;
        },
        setNavbarCollapsed(state, action) {
            state.isNavbarCollapsed = action.payload;
        }
    }
});

export const { toggleNavbar, setNavbarCollapsed } = uiSlice.actions;
export default uiSlice.reducer;