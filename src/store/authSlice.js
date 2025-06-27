import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    error: null
};

const currentUser = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        removeUser: (state) => {
            state.user = null;
            state.token = null;
        }
    }
})

export const { setUser, removeUser } = currentUser.actions;
export default currentUser.reducer;