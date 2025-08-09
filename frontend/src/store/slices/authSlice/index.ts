import { AuthState } from "@/types/auth";
import storage from "redux-persist/lib/storage";
import {
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";

const initialState: AuthState = {
    isAuthenticated: false,
    user: undefined,
};

const persistConfig = {
    key: "auth",
    storage,
    whitelist: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
});

const persistedReducer = persistReducer(
    persistConfig,
    authSlice.reducer
);

export const {} = authSlice.actions;
export const authReducer = persistedReducer;
