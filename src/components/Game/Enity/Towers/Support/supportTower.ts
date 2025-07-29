import { BasicTower } from "../basicTower";
import * as Phaser from "phaser";
import { Characteristics } from "@/type/characteristics";
import { EnityManager } from "../../enityManager";
import { AddTowerCoordinates } from "@/type/gameHelpers";
import { SupportTowers } from "@/type/towerTypes";

export class SupportTower extends BasicTower {
  constructor(
    scene: Phaser.Scene,
    info: AddTowerCoordinates,
    characteristics: Characteristics,
    manager: EnityManager,
    enemy
  ) {
    super(
      scene,
      info,
      characteristics,
      manager,
      SupportTowers.RegularSupportTower,
      "tower",
      enemy
    );
  }
}
