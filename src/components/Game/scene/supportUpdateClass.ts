import * as Phaser from "phaser";
import { TowerManager } from "../Enity/Towers/towerManager";
export class SupportUpdate {
  scene: Phaser.Scene;
  public towerManager: TowerManager;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.towerManager = TowerManager.getInstance(this.scene);
  }

  updateShots() {
    this.towerManager.getShots();
  }
}
