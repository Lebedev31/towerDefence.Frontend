import * as Phaser from "phaser";
import { FieldCell } from "../scene/abstractScene";
import { BasicTower, Characteristics } from "./basicTower";
import { SquareTower, TowerManager } from "./towerManager";

export class RocketLauncherTower extends BasicTower {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    calc: SquareTower,
    square: FieldCell,
    characteristics: Characteristics,
    manager: TowerManager
  ) {
    super(scene, x, y, calc, square, characteristics, manager);
  }
}
