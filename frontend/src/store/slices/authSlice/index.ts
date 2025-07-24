import { AuthState } from "@/types/auth";
import {
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";

const initialState: AuthState = {
    isAuthenticated: false,
    user: undefined,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
});

export const {  } = authSlice.actions;
export const authReducer = authSlice.reducer;
