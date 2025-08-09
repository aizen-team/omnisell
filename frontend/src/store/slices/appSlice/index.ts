import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@/types/app";
import { APP_ACTION_TYPES } from "@/store/slices/appSlice/actionTypes";

const initialState: AppState = {
    loadingRequest: {
        [APP_ACTION_TYPES.LOADING]: true,
        [APP_ACTION_TYPES.ROUTE_LOADING]: false,
    },
};

const appSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAppLoading(state, action: PayloadAction<boolean>) {
            state.loadingRequest[APP_ACTION_TYPES.LOADING] = action.payload;
        },
        setRouteLoading(state, action: PayloadAction<boolean>) {
            state.loadingRequest[APP_ACTION_TYPES.ROUTE_LOADING] = action.payload
        }
    },
});

export const { setAppLoading, setRouteLoading } = appSlice.actions;
export const appReducer = appSlice.reducer;
