import * as Phaser from "phaser";
import { EnityManager } from "../enityManager";
import { AddTowerCoordinates, GameObject } from "@/type/gameHelpers";
import { store } from "@/Api/store";
import {
  MagicTowers,
  RifleTowers,
  ArtilleryTowers,
  SupportTowers,
  Generators,
} from "@/type/towerTypes";
import {
  characteristicsRifleTower,
  characteristicsArtilleryTower,
  characteristicsMagicTower,
  characteristicsRocketLauncherTower,
  characteristicsBasicSupportTower,
  characteristicsGenerator,
} from "./configTowers";
import { createGameObject } from "@/Api/Slice/mainGameSlice";
import { Characteristics } from "@/type/characteristics";
import { toggleTowerMenu, setTypeAndIndex } from "@/Api/Slice/towerMenuSlice";

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
    super(scene, info.x, info.y);
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
    const sprite = this.manager.createObject(info, gameObject);
    console.log(sprite);
    if (!enemy) {
      this.dispatchGameObject(towerName, info.index);
    }
    if (sprite) {
      this.trackingTowerClick(sprite, info.index, typeEnity, enemy);
    }
  }

  // отслеживаем клик по башне
  trackingTowerClick(
    sprite: Phaser.GameObjects.Sprite,
    index: number,
    type: GameObject["type"],
    enemy: boolean
  ) {
    // если это вражеская башня, то ничего не делаем
    if (enemy) return;
    // если это наша башня, то добавляем слушатель на клик
    sprite.on("pointerdown", () => {
      // открываем меню башни
      store.dispatch(setTypeAndIndex({ type, square: index }));
      store.dispatch(toggleTowerMenu());
    });
  }

  // функция урона башни
  takingDamage(damage: Damage) {
    // магический урон
    const magicalDamage =
      damage.magicalDamage - this.magicalDefence > 0
        ? damage.magicalDamage - this.magicalDefence
        : 1; // минимальный урон 1

    // физический урон
    const physicalDamage =
      damage.physicalDamage - this.physicalDefence > 0
        ? damage.physicalDamage - this.physicalDefence
        : 1;

    // урон ядом
    const poisonousDamage =
      damage.poisonousDamage - this.poisonousDefence > 0
        ? damage.poisonousDamage - this.poisonousDefence
        : 1;

    // суммируем урон
    this.hp = this.hp - (magicalDamage + physicalDamage + poisonousDamage);

    // если HP <= 0, то уничтожаем башню
    if (this.hp <= 0) {
      this.destroy();
      // фильтруем массив, чтобы удалить уничтоженные башни
      this.manager.enityObject = this.manager.enityObject.filter(
        (item) => item.active
      );

      // this.manager.field[this.calc.row][this.calc.line].gameObject = undefined;
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

      case SupportTowers.RegularSupportTower:
        store.dispatch(
          createGameObject({
            index: index,
            hp: characteristicsBasicSupportTower.hp,
            type: "tower",
            name: SupportTowers.RegularSupportTower,
          })
        );
        break;

      case Generators.RegularGenerator:
        store.dispatch(
          createGameObject({
            index: index,
            hp: characteristicsGenerator.hp,
            type: "generator",
            name: Generators.RegularGenerator,
          })
        );
        break;

      default:
        break;
    }
  }
}
