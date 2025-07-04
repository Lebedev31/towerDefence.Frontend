import * as Phaser from "phaser";
import { SupportSceneAbctract } from "../scene/abstractScene";
import { CoordinatesTower } from "@/type/type";
import { store } from "@/Api/store";
import { FieldCell } from "../scene/abstractScene";

type SquareTower = {
  row: number;
  line: number;
  nameImg: string;
};

type AddTowerCoordinates = {
  x: number;
  y: number;
  square: FieldCell;
};

export class SupportTower extends SupportSceneAbctract {
  private unsubscribe?: () => void;
  private coord: CoordinatesTower | undefined;

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.coord = undefined;
  }

  private squareCalculationTower(
    coord: CoordinatesTower
  ): SquareTower | undefined {
    const foundSquare = this.field
      .flatMap((rowItems) => {
        return rowItems.flatMap((item) => {
          if (
            item.x1 <= coord.x &&
            item.x2 >= coord.x &&
            item.y1 <= coord.y &&
            item.y2 >= coord.y
          ) {
            return [
              {
                row: item.cellY,
                line: item.cellX,
                nameImg: coord.pathImg,
              },
            ];
          }
          return [];
        });
      })
      .find(Boolean); // find(Boolean) найдет первый не-null/undefined элемент, если он есть
    return foundSquare;
  }

  subscribeCoordinates() {
    this.coord = store.getState().mainGame.coordinatesTower;

    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const current = state.mainGame.coordinatesTower as CoordinatesTower;

      if (current !== this.coord) {
        const calc = this.squareCalculationTower(current);
        if (calc) {
          const info = this.getCenterSquare(calc);
          this.creatingTowerOnTheMap(info, calc);
        }
        this.coord = current;
      }
    });
    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.unsubscribe?.();
    });
  }

  private getCenterSquare(info: SquareTower): AddTowerCoordinates {
    const square = this.field[info.row][info.line];
    const centerX = square.x1 + (square.x2 - square.x1) / 2;
    const centerY = square.y1 + (square.y2 - square.y1) / 2;
    return {
      x: centerX,
      y: centerY,
      square,
    };
  }

  private creatingTowerOnTheMap(
    info: AddTowerCoordinates,
    calc: SquareTower
  ): void {
    this.scene.textures
      .get(calc.nameImg)
      .setFilter(Phaser.Textures.FilterMode.NEAREST);
    const image = this.scene.add.image(info.x, info.y, calc.nameImg);

    image.setDisplaySize(
      info.square.x2 - info.square.x1,
      info.square.y2 - info.square.y1
    );
  }
}
