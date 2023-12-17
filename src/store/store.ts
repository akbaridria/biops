"use client";

import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./features/useToast";
import loadingReducer from "./features/useLoading";
import triggerSlice from "./features/useTrigger";

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    loading: loadingReducer,
    trigger: triggerSlice
  },
});