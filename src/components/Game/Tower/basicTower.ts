import * as Phaser from "phaser";
import { FieldCell } from "../scene/abstractScene";

export type Characteristics = {
  hp: number;
  physicalDamage: number;
  magicalDamage: number;
  poisonousDamage: number;
  physicalDefence: number;
  magicalDefence: number;
  poisonousDefence: number;
  range: number;
  speed: number; // 1 выстрел в speed
};

export class BasicTower extends Phaser.GameObjects.Container {
  hp: number;
  physicalDamage: number;
  magicalDamage: number;
  poisonousDamage: number;
  physicalDefence: number;
  magicalDefence: number;
  poisonousDefence: number;
  range: number;
  speed: number;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    name: string,
    square: FieldCell,
    characteristics: Characteristics
  ) {
    super(scene, x, y);
    scene.add.existing(this);
    const sprite = this.scene.add.sprite(0, 0, name);
    sprite.setDisplaySize(square.x2 - square.x1, square.y2 - square.y1);
    this.add(sprite);
    this.hp = characteristics.hp;
    this.physicalDamage = characteristics.physicalDamage;
    this.magicalDamage = characteristics.magicalDamage;
    this.poisonousDamage = characteristics.poisonousDamage;
    this.physicalDefence = characteristics.physicalDefence;
    this.magicalDefence = characteristics.magicalDefence;
    this.poisonousDefence = characteristics.poisonousDamage;
    this.range = characteristics.range;
    this.speed = characteristics.speed;
  }
}
