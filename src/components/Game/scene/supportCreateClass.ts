import * as Phaser from "phaser";
import { SupportSceneAbctract } from "./abstractScene";
import { TowerManager } from "../Tower/towerManager";

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

  /* createLine() {
    const rows = this.field.length;
    const cols = this.field[0].length;
    const cellWidth = this.width / cols;
    const cellHeight = this.height / rows;

    // 1. Создаем графику для сетки (как и было)
    const graphics = this.scene.add.graphics();
    graphics.lineStyle(1, 0xff0000, 1); // Красные линии для примера

    // 2. Определяем стиль для нашего текста
    const textStyle = {
      // Размер шрифта делаем зависимым от высоты ячейки, чтобы он масштабировался
      font: `${Math.round(cellHeight / 2)}px Arial`,
      fill: "#ffffff", // Белый цвет текста
      align: "center", // Выравнивание по центру
    };

    // 3. Проходим по всем ячейкам в цикле
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const posX = x * cellWidth;
        const posY = y * cellHeight;

        // Рисуем прямоугольник для ячейки
        graphics.strokeRect(posX, posY, cellWidth, cellHeight);

        // 4. Создаем и позиционируем текст
        const text = this.scene.add.text(
          posX + cellWidth / 2, // Координата X в центре ячейки
          posY + cellHeight / 2, // Координата Y в центре ячейки
          x.toString(), // Индекс колонки 'x' как текстовая строка
          textStyle
        );

        // Устанавливаем точку привязки текста в его центр для идеального выравнивания
        text.setOrigin(0.5, 0.5);
      }
    }
  } */

  towersInit() {
    const riffleTower = new TowerManager(this.scene);
  }
}
