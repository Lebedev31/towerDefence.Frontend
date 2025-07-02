import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TypeGame = "defence" | "attack";

export interface MainGameInitialState {
  typeGame: TypeGame;
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
  },
});

export const { setTypeGame } = mainGameSlice.actions;
export default mainGameSlice.reducer;
