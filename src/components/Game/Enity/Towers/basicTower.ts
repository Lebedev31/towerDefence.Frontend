import * as Phaser from "phaser";
import { EnityManager } from "../enityManager";
import { AddTowerCoordinates, GameObject } from "@/type/gameHelpers";
import { store } from "@/Api/store";
import { MagicTowers, RifleTowers, ArtilleryTowers } from "@/type/towerTypes";
import {
  characteristicsRifleTower,
  characteristicsArtilleryTower,
  characteristicsMagicTower,
  characteristicsRocketLauncherTower,
} from "./configTowers";
import { createGameObject, openTowerMenu } from "@/Api/Slice/mainGameSlice";

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
  manager: EnityManager;

  constructor(
    scene: Phaser.Scene,
    info: AddTowerCoordinates,
    characteristics: Characteristics,
    manager: EnityManager,
    towerName: string,
    typeEnity: GameObject["type"],
    enemy: boolean
  ) {
    super(scene);
    scene.add.existing(this);
    const gameObject: GameObject = {
      index: info.index,
      type: typeEnity,
      hp: characteristics.hp,
      name: towerName,
      enemy,
    };
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
    this.manager.createObject(info, gameObject);
    if (!enemy) {
      this.dispatchGameObject(towerName, info.index);
    }
    this.setupInteractivity(towerName, info.index);
  }

  private setupInteractivity(towerName: string, index: number) {
    this.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.width, this.height),
      Phaser.Geom.Rectangle.Contains
    );

    store.dispatch(
      openTowerMenu({
        // Используйте action creator
        towerName,
        index,
        characteristics: {
          hp: this.hp,
          physicalDamage: this.physicalDamage,
          magicalDamage: this.magicalDamage,
          poisonousDamage: this.poisonousDamage,
          physicalDefence: this.physicalDefence,
          magicalDefence: this.magicalDefence,
          poisonousDefence: this.poisonousDefence,
          range: this.range,
          speed: this.speed,
        },
      })
    );

    // Визуальная обратная связь
    this.on("pointerover", () => {
      this.setAlpha(0.8);
    });

    this.on("pointerout", () => {
      this.setAlpha(1);
    });
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
      this.manager.enityObject = this.manager.enityObject.filter(
        (item) => item.active
      );
      //  this.manager.field[this.calc.row][this.calc.line].gameObject = undefined;
    }
  }

  dispatchGameObject(name: string, index: number) {
    switch (name) {
      case RifleTowers.RegularShootingTower:
        store.dispatch(
          createGameObject({
            index: index,
            hp: characteristicsRifleTower.hp,
            type: "tower",
            name: RifleTowers.RegularShootingTower,
          })
        );
        break;
      case MagicTowers.RegularMagicTower:
        store.dispatch(
          createGameObject({
            index: index,
            hp: characteristicsMagicTower.hp,
            type: "tower",
            name: MagicTowers.RegularMagicTower,
          })
        );
        break;
      case ArtilleryTowers.RegularArtilleryTower:
        store.dispatch(
          createGameObject({
            index: index,
            hp: characteristicsArtilleryTower.hp,
            type: "tower",
            name: ArtilleryTowers.RegularArtilleryTower,
          })
        );
        break;
      case ArtilleryTowers.RocketLauncherTower:
        store.dispatch(
          createGameObject({
            index: index,
            hp: characteristicsRocketLauncherTower.hp,
            type: "tower",
            name: ArtilleryTowers.RocketLauncherTower,
          })
        );
        break;
      default:
        break;
    }
  }
}
