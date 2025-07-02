import * as Phaser from "phaser";
import { makeStore } from "@/Api/store";
import { SupportCreate } from "./supportCreateClass";

const typeGame = makeStore().getState().mainGame.typeGame; // оборона или атака

export class MainScene extends Phaser.Scene {
  supportCreate!: SupportCreate;
  constructor() {
    super("MainScene");
  }

  init(): void {
    // Создаем экземпляр помощника и передаем ему эту сцену (`this`)
    this.supportCreate = new SupportCreate(this);
  }

  preload(): void {
    // Загрузка ассетов
    this.load.image("startMap", "assets/imgGame/карта.png");
  }

  create(): void {
    //создание карты
    this.supportCreate.createMap();
    this.supportCreate.createLine();
  }

  update(): void {
    // Логика обновления
  }
}
