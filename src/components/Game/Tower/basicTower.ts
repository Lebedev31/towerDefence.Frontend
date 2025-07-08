import * as Phaser from "phaser";
import { FieldCell } from "../scene/abstractScene";
import { TowerManager } from "./towerManager";
import { SquareTower } from "./towerManager";

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

type Damage = Pick<
  Characteristics,
  "physicalDamage" | "magicalDamage" | "poisonousDamage"
>;

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
  manager: TowerManager;
  calc: SquareTower;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    calc: SquareTower,
    square: FieldCell,
    characteristics: Characteristics,
    manager: TowerManager
  ) {
    super(scene, x, y);
    scene.add.existing(this);
    const sprite = this.scene.add.sprite(0, 0, calc.nameImg);
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
    this.manager = manager;
    this.calc = calc;
  }

  takingDamage(damage: Damage) {
    const d1 =
      damage.magicalDamage - this.magicalDefence > 0
        ? damage.magicalDamage - this.magicalDefence
        : 1; // минимальный урон 1

    const d2 =
      damage.physicalDamage - this.physicalDefence > 0
        ? damage.physicalDamage - this.physicalDefence
        : 1;

    const d3 =
      damage.poisonousDamage - this.poisonousDefence > 0
        ? damage.poisonousDamage - this.poisonousDefence
        : 1;

    this.hp = this.hp - (d1 + d2 + d3);
    if (this.hp <= 0) {
      this.destroy();
      this.manager.towers = this.manager.towers.filter((item) => item.active);
      this.manager.field[this.calc.row][this.calc.line].gameObject = undefined;
    }
  }
}
