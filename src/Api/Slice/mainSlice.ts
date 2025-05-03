import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setToggle: (state, actions: PayloadAction<boolean>) => {
      state.toggle = actions.payload;
    },
  },
});

export const { setToggle } = mainSlice.actions;
export default mainSlice.reducer;
