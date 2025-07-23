import { BasicTower } from "../basicTower";
import * as Phaser from "phaser";
import { Characteristics } from "../basicTower";
import { EnityManager } from "../../enityManager";
import { AddTowerCoordinates } from "@/type/gameHelpers";
import { MagicTowers } from "@/type/towerTypes";

export class MagicTower extends BasicTower {
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
      MagicTowers.RegularMagicTower,
      "tower",
      enemy
    );
  }
}
