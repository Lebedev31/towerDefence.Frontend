/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoordinatesTower } from "@/type/gameHelpers";
import { deathZones } from "@/components/Game/config/deatZone";
import { FieldCell, GameObject } from "@/type/gameHelpers";

export type TypeGame = "defence" | "attack";

export interface MainGameInitialState {
  game: TypeGame;
  coordinatesTower: CoordinatesTower | undefined;
  field: FieldCell[];
  configuration: any;
}

const initialState: MainGameInitialState = {
  game: "defence",
  coordinatesTower: undefined,
  field: [],
  configuration: null,
};

export const mainGameSlice = createSlice({
  name: "mainGame",
  initialState,
  reducers: {
    setTypeGame: (state, action: PayloadAction<TypeGame>) => {
      state.game = action.payload;
    },

    setCoordinatesTower: (state, action: PayloadAction<CoordinatesTower>) => {
      state.coordinatesTower = action.payload;
    },

    clearCoordinatesTower: (state) => {
      state.coordinatesTower = undefined;
    },

    initField: (
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) => {
      const rows = 10;
      const cols = 25;
      const cellWidth = action.payload.width / cols;
      const cellHeight = action.payload.height / rows;
      state.field = Array.from({ length: rows }, (_, y) =>
        Array.from({ length: cols }, (_, x) => ({
          x1: x * cellWidth,
          x2: (x + 1) * cellWidth,
          y1: y * cellHeight,
          y2: (y + 1) * cellHeight,
          cellX: x,
          cellY: y,
          deathZone: deathZones.some(
            (item) => item.row === y && item.line === x
          ),
        }))
      ).flat();
    },

    createGameObject: (state, action: PayloadAction<GameObject>) => {
      const cell = state.field[action.payload.index];
      if (cell && !cell.gameObject && !cell.deathZone) {
        cell.gameObject = {
          type: action.payload.type,
          index: action.payload.index,
          hp: action.payload.hp,
          name: action.payload.name,
        };
      }
    },

    gameObjectReceived: (state, action: PayloadAction<GameObject>) => {
      const { index } = action.payload;
      if (state.field[index]) {
        state.field[index].gameObject = action.payload;
        state.field[index].gameObject.enemy = true;
      }
    },

    removeGameObject: (state, action: PayloadAction<number>) => {
      const cell = state.field[action.payload];
      if (cell) {
        cell.gameObject = undefined;
      }
    },

    updateGameObjectHp: (
      state,
      action: PayloadAction<{ index: number; hp: number }>
    ) => {
      const cell = state.field[action.payload.index];
      if (cell?.gameObject) {
        cell.gameObject.hp = action.payload.hp;
      }
    },

    setConfiguration(state, action: PayloadAction<any>) {
      state.configuration = action.payload;
    },
  },
});

export const {
  setTypeGame,
  setCoordinatesTower,
  clearCoordinatesTower,
  initField,
  createGameObject,
  gameObjectReceived,
  removeGameObject,
  updateGameObjectHp,
  setConfiguration,
} = mainGameSlice.actions;

export default mainGameSlice.reducer;
