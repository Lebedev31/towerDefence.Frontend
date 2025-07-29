import * as Phaser from "phaser";
import { EnityManager } from "../enityManager";
import { CoordinatesTower } from "@/type/gameHelpers";
import { store } from "@/Api/store";
import { Shots } from "../Shots/Shots";
export type SquareTower = {
  nameImg: string;
  index: number;
};

export class TowerManager extends EnityManager {
  public coord: CoordinatesTower | undefined;
  public shotManager: Shots;
  private static instance: TowerManager;
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.setupGameObjectTracking();
    this.shotManager = new Shots(scene);
  }

  setupGameObjectTracking() {
    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const current = state.mainGame.coordinatesTower as CoordinatesTower;
      if (current !== this.coord) {
        this.coord = store.getState().mainGame.coordinatesTower;
        const calc = this.squareCalculationTower(current);
        if (calc && this.coord) {
          this.choiseEnityObject(calc, this.coord.pathImg, false);
          this.shotManager.createShots(this.coord.pathImg);
          console.log(this.enityObject);
        }
        this.coord = current;
      }
    });
    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.unsubscribe?.();
    });
  }

  private squareCalculationTower(coord: CoordinatesTower): number {
    const foundSquare = this.field.findIndex(
      (item) =>
        item.x1 <= coord.x &&
        item.x2 >= coord.x &&
        item.y1 <= coord.y &&
        item.y2 >= coord.y &&
        !item.gameObject &&
        !item.deathZone
    );
    return foundSquare;
  }

  public static getInstance(scene: Phaser.Scene): TowerManager {
    if (!TowerManager.instance) {
      TowerManager.instance = new TowerManager(scene);
    }
    return TowerManager.instance;
  }

  getShots() {
    if (this.coord) {
      this.enityObject.forEach(() => {
        this.shotManager.shoot(this?.coord.x, this?.coord.y, "magicShots1");
      });
    }
  }
}
