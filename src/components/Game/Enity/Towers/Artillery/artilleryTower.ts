import { BasicTower } from "../basicTower";
import * as Phaser from "phaser";
import { Characteristics } from "../basicTower";
import { EnityManager } from "../../enityManager";
import { AddTowerCoordinates } from "@/type/gameHelpers";
import { ArtilleryTowers } from "@/type/towerTypes";

export class ArtilleryTower extends BasicTower {
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
      ArtilleryTowers.RegularArtilleryTower,
      "tower",
      enity
    );
  }
}
