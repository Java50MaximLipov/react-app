import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  [property: string]: any;
  code: string;
} = {
  code: "OK",
};
const codeSlice = createSlice({
  initialState,
  name: "codeState",
  reducers: {
    set: (state, data) => {
      state.code = data.payload;
    },
    reset: (state) => {
      state.code = initialState.code;
    },
  },
});

export const codeActions = codeSlice.actions;
export const codeReducer = codeSlice.reducer;
