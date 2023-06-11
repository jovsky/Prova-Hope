import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
    isLoggedIn: boolean;
    user: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<{ email: string; password: string }>
        ) => {
            // Perform your authentication logic here
            // For simplicity, let's assume the login is successful
            state.isLoggedIn = true;
            state.user = action.payload.email;
        },
        logout: (state) => {
            // Reset the authentication state
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectemail = (state: RootState) => state.auth.user;

export default authSlice.reducer;
