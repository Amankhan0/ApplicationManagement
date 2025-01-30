import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SampleState {
  count: number;
}

const initialState: SampleState = {
  count: 0, // ✅ Simple counter state
};

const sampleSlice = createSlice({
  name: "sample",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = sampleSlice.actions;
export default sampleSlice.reducer;
