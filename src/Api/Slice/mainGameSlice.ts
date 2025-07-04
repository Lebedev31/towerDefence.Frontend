import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoordinatesTower } from "@/type/type";

export type TypeGame = "defence" | "attack";

export interface MainGameInitialState {
  typeGame: TypeGame;
  coordinatesTower: CoordinatesTower | undefined;
}

const initialState: MainGameInitialState = {
  typeGame: "defence",
  coordinatesTower: undefined,
  // checkLeftMouseUp: false,
};

export const mainGameSlice = createSlice({
  name: "mainGame",
  initialState,
  reducers: {
    setTypeGame: (state, action: PayloadAction<TypeGame>) => {
      state.typeGame = action.payload;
    },

    setCoordinatesTower: (state, action: PayloadAction<CoordinatesTower>) => {
      state.coordinatesTower = action.payload;
    },

    clearCoordinatesTower: (state) => {
      state.coordinatesTower = undefined;
    },
  },
});

export const { setTypeGame, setCoordinatesTower } = mainGameSlice.actions;
export default mainGameSlice.reducer;
