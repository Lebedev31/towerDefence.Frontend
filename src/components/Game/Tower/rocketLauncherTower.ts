import { ArtilleryTower } from "./artilleryTower";
import * as Phaser from "phaser";
import { FieldCell } from "../scene/abstractScene";
import { Characteristics } from "./basicTower";

export class RocketLauncherTower extends ArtilleryTower {
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
