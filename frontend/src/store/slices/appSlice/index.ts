import {
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { AppState } from "@/types/app";
const initialState: AppState = {};

const appSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
});

export const {} = appSlice.actions;
export const authReducer = appSlice.reducer;
