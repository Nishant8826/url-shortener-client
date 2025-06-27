import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./authSlice"
import themeReducer from "./themeSlice"

export const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        theme: themeReducer
    }
})