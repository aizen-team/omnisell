import axiosClient from "@/services/axiosClient";
import { AppResponse } from "@/types/app";
import { LoginPayload, User } from "@/types/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

const ACTION_NAME = "/login";

const loginAction = createAsyncThunk<
    AppResponse<User>,
    LoginPayload,
    {
        rejectValue: AppResponse<null>;
    }
>(ACTION_NAME, async (payload, { rejectWithValue }) => {
    try {
        const response = await axiosClient.post("login", {
            data: payload,
        });

        return response.data;
    } catch (e: unknown) {
        const error = e as AppResponse<null>;
        return rejectWithValue({
            message: error.message,
        });
    }
});

export default loginAction;
