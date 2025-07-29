import { BasicTower } from "../basicTower";
import * as Phaser from "phaser";
import { Characteristics } from "@/type/characteristics";
import { EnityManager } from "../../enityManager";
import { AddTowerCoordinates } from "@/type/gameHelpers";
import { Generators } from "@/type/towerTypes";

export class Generator extends BasicTower {
  constructor(
    scene: Phaser.Scene,
    info: AddTowerCoordinates,
    characteristics: Characteristics,
    manager: EnityManager,
    enity: boolean
  ) {
    super(
      scene,
      info,
      characteristics,
      manager,
      Generators.RegularGenerator,
      "tower",
      enity
    );
  }
}
