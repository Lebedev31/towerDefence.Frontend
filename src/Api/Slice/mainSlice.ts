import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  toggle: boolean;
  isOpen: boolean;
}

const initialState: InitialState = {
  toggle: true,
  isOpen: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setToggle: (state, actions: PayloadAction<boolean>) => {
      state.toggle = actions.payload;
    },

    setOpenModal: (state, actions: PayloadAction<boolean>) => {
      state.isOpen = actions.payload;
    },
  },
});

export const { setToggle, setOpenModal } = mainSlice.actions;
export default mainSlice.reducer;
