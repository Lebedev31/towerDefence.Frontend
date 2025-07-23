import * as Phaser from "phaser";
import { MainScene } from "../scene/scene";

export const config = (
  parent: HTMLDivElement
): Phaser.Types.Core.GameConfig => {
  return {
    type: Phaser.AUTO,
    parent,
    scene: MainScene,
    width: 1500,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
        debug: false, // Включить для отладки хитбоксов
        fps: 60, // Оптимизация под 60 FPS
      },
    },
  };
};
