import { RootState } from "@/store";
import {
    createDraftSafeSelectorCreator,
    weakMapMemoize,
} from "@reduxjs/toolkit";

const createWeakMapDraftSafeSelector =
    createDraftSafeSelectorCreator(weakMapMemoize);
const selectAuthState = (state: RootState) => state.auth;
