import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TypeGame = "defence" | "attack";
export type CoordinatesTower = {
  x: number;
  y: number;
  path: string;
};

export interface MainGameInitialState {
  typeGame: TypeGame;
  coordinatesTower?: CoordinatesTower;
}

const initialState: MainGameInitialState = {
  typeGame: "defence",
};

export const mainGameSlice = createSlice({
  name: "mainGame",
  initialState,
  reducers: {
    setTypeGame: (state, action: PayloadAction<TypeGame>) => {
      state.typeGame = action.payload;
    },

    coordinatesTower: (state, action: PayloadAction<CoordinatesTower>) => {
      state.coordinatesTower = action.payload;
    },
  },
});

export const { setTypeGame } = mainGameSlice.actions;
export default mainGameSlice.reducer;
