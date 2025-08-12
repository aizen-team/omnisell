import { RootState } from "@/store";
import {
    createDraftSafeSelectorCreator,
    weakMapMemoize,
} from "@reduxjs/toolkit";
import { APP_ACTION_TYPES } from "./actionTypes";

const createWeakMapDraftSafeSelector =
    createDraftSafeSelectorCreator(weakMapMemoize);
const selectAppState = (state: RootState) => state.app;

export const selectAppLoading = createWeakMapDraftSafeSelector(
    [selectAppState],
    (app) => app.loadingRequest[APP_ACTION_TYPES.LOADING]
);

export const selectRouteLoading = createWeakMapDraftSafeSelector(
    [selectAppState],
    (app) => app.loadingRequest[APP_ACTION_TYPES.ROUTE_LOADING]
);
