import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isOpen: boolean;
  type: "tower" | "generator";
  square: number;
}

const initialState: InitialState = {
  isOpen: false,
  type: "tower",
  square: 0,
};

export const towerMenuSlice = createSlice({
  name: "towerMenu",
  initialState,
  reducers: {
    toggleTowerMenu: (state) => {
      state.isOpen = !state.isOpen;
    },

    setTypeAndIndex: (
      state,
      actions: PayloadAction<{ type: "tower" | "generator"; square: number }>
    ) => {
      state.type = actions.payload.type;
      state.square = actions.payload.square;
    },
  },
});

export const { toggleTowerMenu, setTypeAndIndex } = towerMenuSlice.actions;
