import * as Phaser from "phaser";
import { SupportSceneAbctract } from "./abstractScene";
import { TowerManager } from "../Enity/Towers/towerManager";
import { EnemyStaticManager } from "../Enity/Enemy/enemyStaticManager";

export class SupportCreate extends SupportSceneAbctract {
  // Мы передаем настоящую сцену в конструктор
  constructor(scene: Phaser.Scene) {
    super(scene);
  }

  createMap() {
    const bg = this.scene.add.image(0, 0, "startMap").setOrigin(0, 0);
    bg.setDisplaySize(this.width, this.height);
  }

  getField() {
    return this.field;
  }

  createLine() {
    const rows = 10;
    const cols = 25;
    const cellWidth = this.width / cols;
    const cellHeight = this.height / rows;

    const graphics = this.scene.add.graphics();
    graphics.lineStyle(1, 0xff0000, 1); // Красные линии

    // Рисуем вертикальные линии
    for (let x = 0; x <= cols; x++) {
      const posX = x * cellWidth;
      graphics.moveTo(posX, 0);
      graphics.lineTo(posX, this.height);
    }

    // Рисуем горизонтальные линии
    for (let y = 0; y <= rows; y++) {
      const posY = y * cellHeight;
      graphics.moveTo(0, posY);
      graphics.lineTo(this.width, posY);
    }

    graphics.strokePath();
  }
  towersInit() {
    TowerManager.getInstance(this.scene);
  }
  enemyInit() {
    new EnemyStaticManager(this.scene);
  }
}
