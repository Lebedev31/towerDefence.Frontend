import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  toggle: boolean;
}

const initialState: InitialState = {
  toggle: true,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
  },
});

export const { setToggle } = mainSlice.actions;
export default mainSlice.reducer;
