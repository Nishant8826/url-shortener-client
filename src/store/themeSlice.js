import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "dark"
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme == "dark" ? "light" : "dark";
        },
        setTheme: (state, action) => {
            const { theme } = action.payload;
            state.theme = theme;
        }
    }
})

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;