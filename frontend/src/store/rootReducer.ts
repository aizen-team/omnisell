import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "@/store/slices/authSlice";
import { appReducer } from "@/store/slices/appSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer
});

export default rootReducer;
