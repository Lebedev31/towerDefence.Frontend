import * as Phaser from "phaser";
import { deathZones } from "../config/deatZone";

export type FieldCell = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  cellX: number; // номер по x (от 1 до 25)
  cellY: number; // номер по y (от 1 до 10)
  gameObject?: "tower" | "generator";
  deathZone: boolean;
};

export abstract class SupportSceneAbctract {
  public field!: FieldCell[][];
  protected width!: number;
  protected height!: number;
  protected scene!: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.width = scene.sys.game.config.width as number;
    this.height = scene.sys.game.config.height as number;
    const rows = 10;
    const cols = 25;
    const cellWidth = this.width / cols;
    const cellHeight = this.height / rows;
    this.field = Array.from({ length: rows }, (_, y) =>
      Array.from({ length: cols }, (_, x) => ({
        x1: x * cellWidth,
        x2: (x + 1) * cellWidth,
        y1: y * cellHeight,
        y2: (y + 1) * cellHeight,
        cellX: x,
        cellY: y,
        deathZone: deathZones.some((item) => item.row === y && item.line === x),
      }))
    );
  }
}
