import { BasicTower } from "./basicTower";
import * as Phaser from "phaser";
import { FieldCell } from "../scene/abstractScene";
import { Characteristics } from "./basicTower";
import { TowerManager, SquareTower } from "./towerManager";

export class RifleTower extends BasicTower {
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
