import { createSlice } from "@reduxjs/toolkit";
import type { ILoading } from '@/types'

const initialState: ILoading = {
  loading: false
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;