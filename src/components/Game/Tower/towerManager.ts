import * as Phaser from "phaser";
import { SupportSceneAbctract } from "../scene/abstractScene";
import { CoordinatesTower } from "@/type/type";
import { store } from "@/Api/store";
import { FieldCell } from "../scene/abstractScene";
import { RifleTower } from "./rifleTower";
import { RocketLauncherTower } from "./rocketLauncherTower";
import { ArtilleryTower } from "./artilleryTower";
import { MagicTower } from "./magicTower";
import { RifleTowers, MagicTowers, ArtilleryTowers } from "@/type/type";
import {
  characteristicsRifleTower,
  characteristicsArtilleryTower,
  characteristicsMagicTower,
  characteristicsRocketLauncherTower,
} from "./configTowers";

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

export class TowerManager extends SupportSceneAbctract {
  private unsubscribe?: () => void;
  private coord: CoordinatesTower | undefined;
  public towers: Phaser.GameObjects.Container[] = [];

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.coord = store.getState().mainGame.coordinatesTower;
    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const current = state.mainGame.coordinatesTower as CoordinatesTower;

      if (current !== this.coord) {
        const calc = this.squareCalculationTower(current);
        if (calc) {
          const info = this.getCenterSquare(calc);
          if (info) {
            this.creatingTowerOnTheMap(info, calc);
          }
        }
        this.coord = current;
      }
    });
    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.unsubscribe?.();
    });
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
            item.y2 >= coord.y &&
            !item.gameObject &&
            !item.deathZone
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

  private getCenterSquare(
    info: SquareTower | undefined
  ): AddTowerCoordinates | undefined {
    if (info) {
      const square = this.field[info.row][info.line];
      const centerX = square.x1 + (square.x2 - square.x1) / 2;
      const centerY = square.y1 + (square.y2 - square.y1) / 2;
      return {
        x: centerX,
        y: centerY,
        square,
      };
    }
  }

  private creatingTowerOnTheMap(
    info: AddTowerCoordinates,
    calc: SquareTower
  ): void {
    switch (calc.nameImg) {
      case RifleTowers.RegularShootingTower:
        const rifleTower = new RifleTower(
          this.scene,
          info.x,
          info.y,
          calc.nameImg,
          info.square,
          characteristicsRifleTower
        );
        this.towers.push(rifleTower);
        break;
      case MagicTowers.RegularMagicTower:
        const magicTower = new MagicTower(
          this.scene,
          info.x,
          info.y,
          calc.nameImg,
          info.square,
          characteristicsMagicTower
        );
        this.towers.push(magicTower);
        break;
      case ArtilleryTowers.RegularArtilleryTower:
        const artilleryTower = new ArtilleryTower(
          this.scene,
          info.x,
          info.y,
          calc.nameImg,
          info.square,
          characteristicsArtilleryTower
        );
        this.towers.push(artilleryTower);
        break;
      case ArtilleryTowers.RocketLauncherTower:
        const rocketLauncherTower = new RocketLauncherTower(
          this.scene,
          info.x,
          info.y,
          calc.nameImg,
          info.square,
          characteristicsRocketLauncherTower
        );
        this.towers.push(rocketLauncherTower);
        break;
      default:
        break;
    }
    this.field[calc.row][calc.line].gameObject = "tower";
  }
}
