import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  toggle: boolean;
  personalData: {
    id: string;
    name: string;
  };
}

const initialState: InitialState = {
  toggle: true,
  personalData: {
    id: "",
    name: "",
  },
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setToggle: (state, actions: PayloadAction<boolean>) => {
      state.toggle = actions.payload;
    },

    setPersonalData: (
      state,
      actions: PayloadAction<{ id: string; name: string }>
    ) => {
      state.personalData.id = actions.payload.id;
      state.personalData.name = actions.payload.name;
    },

    clearPersonalData: (state) => {
      state.personalData.id = "";
      state.personalData.name = "";
    },
  },
});

export const { setToggle, setPersonalData, clearPersonalData } =
  mainSlice.actions;
export default mainSlice.reducer;
