import axiosClient from "@/services/axiosClient";
import { AppResponse } from "@/types/app";
import { LoginPayload, User } from "@/types/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_ACTION_TYPES } from "@/store/slices/authSlice/actionTypes";

const loginAction = createAsyncThunk<
    AppResponse<User>,
    LoginPayload,
    {
        rejectValue: AppResponse<null>;
    }
>(AUTH_ACTION_TYPES.LOGIN, async (payload, { rejectWithValue }) => {
    try {
        const response = await axiosClient.post("login", {
            data: payload,
        });

        return response.data;
    } catch (err: unknown) {
        const errorResponse = err as AppResponse<null>;
        return rejectWithValue({
            message: errorResponse.message,
        });
    }
});

export default loginAction;
