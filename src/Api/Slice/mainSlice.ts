import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  toggle: boolean;
  isOpen: boolean;
  idUser: string;
}

const initialState: InitialState = {
  toggle: true,
  isOpen: false,
  idUser: "",
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

    setIdUser: (state, actions: PayloadAction<string>) => {
      state.idUser = actions.payload;
    },
  },
});

export const { setToggle, setOpenModal, setIdUser } = mainSlice.actions;
export default mainSlice.reducer;
