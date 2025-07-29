import * as Phaser from "phaser";
import { SupportCreate } from "./supportCreateClass";
import { SupportUpdate } from "./supportUpdateClass";
import { BasicTower } from "../Enity/Towers/basicTower";
import {
  RifleTowers,
  MagicTowers,
  ArtilleryTowers,
  ArtilleryTowersPatch,
  RifleTowersPatch,
  MagicTowersPatch,
  SupportTowers,
  SupportTowersPatch,
  Generators,
  GeneratorsPatch,
} from "@/type/towerTypes";

import { MagicShots, MagicShotsPath } from "@/type/shots";

export class MainScene extends Phaser.Scene {
  supportCreate!: SupportCreate;
  supportUpdate!: SupportUpdate;
  basicTower!: BasicTower;

  constructor() {
    super("MainScene");
  }

  init(): void {
    // Создаем экземпляры классов-помощников
    this.supportCreate = new SupportCreate(this);
    this.supportUpdate = new SupportUpdate(this);
  }

  preload(): void {
    // Загрузка всех необходимых ассетов
    this.load.image("startMap", "assets/imgGame/карта.png");
    this.load.image(
      RifleTowers.RegularShootingTower,
      RifleTowersPatch.RegularShootingTowerPatch
    );
    this.load.image(
      MagicTowers.RegularMagicTower,
      MagicTowersPatch.RegularMagicTowerPatch
    );
    this.load.image(
      ArtilleryTowers.RegularArtilleryTower,
      ArtilleryTowersPatch.RegularArtilleryTowerPatch
    );
    this.load.image(
      ArtilleryTowers.RocketLauncherTower,
      ArtilleryTowersPatch.RocketLauncherTowerPatch
    );

    this.load.image(
      SupportTowers.RegularSupportTower,
      SupportTowersPatch.RegularSupportTowerPatch
    );

    this.load.image(
      Generators.RegularGenerator,
      GeneratorsPatch.RegularGeneratorPatch
    );

    this.load.image(MagicShots.MagicShots1, MagicShotsPath.MagicShotsPath);
  }

  create(): void {
    // Создание игровых объектов
    this.supportCreate.createMap(); // загрузка карты
    this.supportCreate.towersInit();
    this.supportCreate.createLine();
    this.supportCreate.enemyInit();
  }

  update(): void {
    // Ваша логика обновления, которая выполняется каждый кадр
    this.supportUpdate.updateShots();
  }
}
