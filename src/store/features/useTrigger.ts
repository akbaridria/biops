import { createSlice } from "@reduxjs/toolkit";
import type { ITrigger } from '@/types'

const initialState: ITrigger = {
  counter: 0,
  counterPosition: 0
};

const triggerSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setTrigger: (state, action) => {
      state.counter = action.payload + state.counter
    },
    setTriggerPosition: (state, action) => {
      state.counterPosition = action.payload + state.counterPosition
    }
  },
});

export const { setTrigger, setTriggerPosition } = triggerSlice.actions;

export default triggerSlice.reducer;