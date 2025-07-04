import * as Phaser from "phaser";
import { SupportCreate } from "./supportCreateClass";
import { SupportUpdate } from "./supportUpdateClass";
import {
  RifleTowers,
  MagicTowers,
  RifleTowersPatch,
  MagicTowersPatch,
  ArtilleryTowers,
  ArtilleryTowersPatch,
} from "@/type/type";

export class MainScene extends Phaser.Scene {
  supportCreate!: SupportCreate;
  supportUpdate!: SupportUpdate;

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
  }

  create(): void {
    // Создание игровых объектов
    this.supportCreate.createMap(); // загрузка карты
    this.supportCreate.createLine(); // линии для разработки
    this.supportCreate.supportTower.subscribeCoordinates(); // вычисление координатов башни
  }

  update(time: number, delta: number): void {
    // Ваша логика обновления, которая выполняется каждый кадр
  }
}
