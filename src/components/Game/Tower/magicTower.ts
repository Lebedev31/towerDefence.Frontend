import { BasicTower } from "./basicTower";
import * as Phaser from "phaser";
import { FieldCell } from "../scene/abstractScene";
import { Characteristics } from "./basicTower";

export class MagicTower extends BasicTower {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    name: string,
    square: FieldCell,
    characteristics: Characteristics
  ) {
    super(scene, x, y, name, square, characteristics);
  }
}
