import * as Phaser from "phaser";
import { SupportSceneAbctract } from "./abstractScene";
import { SupportTower } from "../Tower/supportTowerClass";

export class SupportCreate extends SupportSceneAbctract {
  // Мы передаем настоящую сцену в конструктор
  supportTower: SupportTower;
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.supportTower = new SupportTower(scene);
  }

  createMap() {
    const bg = this.scene.add.image(0, 0, "startMap").setOrigin(0, 0);
    bg.setDisplaySize(this.width, this.height);
  }

  getField() {
    return this.field;
  }

  createLine() {
    const rows = this.field.length;
    const cols = this.field[0].length;
    const cellWidth = this.width / cols;
    const cellHeight = this.height / rows;

    const graphics = this.scene.add.graphics();
    graphics.lineStyle(1, 0xff0000, 1); // красные линии для примера

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const posX = x * cellWidth;
        const posY = y * cellHeight;
        // Рисуем прямоугольник для каждой ячейки
        graphics.strokeRect(posX, posY, cellWidth, cellHeight);
      }
    }
  }
}
