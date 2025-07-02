import * as Phaser from "phaser";
import { MainScene } from "../scene/scene";

export const config = (
  parent: HTMLDivElement
): Phaser.Types.Core.GameConfig => {
  return {
    width: 1350,
    height: 530,
    type: Phaser.AUTO,
    parent,
    scene: MainScene,
    physics: {
      default: "arcade",
      arcade: {
        debug: false, // Включить для отладки хитбоксов
        fps: 60, // Оптимизация под 60 FPS
      },
    },
  };
};
