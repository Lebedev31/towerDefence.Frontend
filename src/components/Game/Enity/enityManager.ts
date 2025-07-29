import * as Phaser from "phaser";
import { SupportSceneAbctract } from "../scene/abstractScene";
import { GameObject } from "@/type/gameHelpers";
import {
  RifleTowers,
  MagicTowers,
  ArtilleryTowers,
  SupportTowers,
  Generators,
} from "@/type/towerTypes";
import { RifleTower } from "../Enity/Towers/Rifle/rifleTower";
import { ArtilleryTower } from "./Towers/Artillery/artilleryTower";
import { RocketLauncherTower } from "./Towers/Artillery/rocketLauncherTower";
import { MagicTower } from "./Towers/Magic/magicTower";
import { SupportTower } from "./Towers/Support/supportTower";
import { Generator } from "./Towers/Generators/generator";
import {
  characteristicsRifleTower,
  characteristicsMagicTower,
  characteristicsArtilleryTower,
  characteristicsRocketLauncherTower,
  characteristicsBasicSupportTower,
} from "./Towers/configTowers";
import { AddTowerCoordinates } from "@/type/gameHelpers";

export abstract class EnityManager extends SupportSceneAbctract {
  public enityObject: Phaser.GameObjects.Container[] = [];

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.setupGameObjectTracking();
  }

  abstract setupGameObjectTracking(): void;

  choiseEnityObject(index: number, name: string, enemy: boolean) {
    const coord = this.getCenterSquare(index);

    if (!coord) {
      console.error(`Не удалось получить координаты для индекса ${index}`);
      return;
    }

    // Выбираем тип объекта по name
    switch (name) {
      // Стрелковые башни
      case RifleTowers.RegularShootingTower:
        const tower = new RifleTower(
          this.scene,
          coord,
          characteristicsRifleTower,
          this,
          enemy
        );

        this.enityObject.push(tower);
        break;

      // Магические башни
      case MagicTowers.RegularMagicTower:
        const magicTower = new MagicTower(
          this.scene,
          coord,
          characteristicsMagicTower,
          this,
          enemy
        );

        this.enityObject.push(magicTower);
        break;

      // Артиллерийские башни
      case ArtilleryTowers.RegularArtilleryTower:
        const artilleryTower = new ArtilleryTower(
          this.scene,
          coord,
          characteristicsArtilleryTower,
          this,
          enemy
        );

        this.enityObject.push(artilleryTower);
        break;

      case ArtilleryTowers.RocketLauncherTower:
        const rocketLauncherTower = new RocketLauncherTower(
          this.scene,
          coord,
          characteristicsRocketLauncherTower,
          this,
          enemy
        );

        this.enityObject.push(rocketLauncherTower);
        break;

      case SupportTowers.RegularSupportTower:
        const supportTower = new SupportTower(
          this.scene,
          coord,
          characteristicsBasicSupportTower,
          this,
          enemy
        );

        this.enityObject.push(supportTower);
        break;

      case Generators.RegularGenerator:
        const generator = new Generator(
          this.scene,
          coord,
          characteristicsBasicSupportTower,
          this,
          enemy
        );

        this.enityObject.push(generator);
        break;

      default:
        console.error(`Неизвестный тип объекта: ${name}`);
        break;
    }
  }

  public getEnityObjects(): Phaser.GameObjects.Container[] {
    return this.enityObject;
  }

  public getObjectByIndex(
    index: number
  ): Phaser.GameObjects.Container | undefined {
    return this.enityObject.find((obj) => obj.getData("index") === index);
  }

  public clearAllEnemyObjects() {
    this.enityObject.forEach((obj) => obj.destroy());
    this.enityObject = [];
  }

  public createObject(coord: AddTowerCoordinates, gameObject: GameObject) {
    try {
      // Создаем контейнер для объекта
      const container = this.scene.add.container(coord.x, coord.y);
      // Создаем спрайт объекта
      const sprite = this.scene.add.sprite(0, 0, gameObject.name);

      // Настраиваем размер спрайта под размер ячейки
      const cellWidth = coord.square.x2 - coord.square.x1;
      const cellHeight = coord.square.y2 - coord.square.y1;

      sprite.setInteractive();

      sprite.setDisplaySize(cellWidth * 0.8, cellHeight * 0.8); // 80% от размера ячейки

      // Добавляем спрайт в контейнер
      container.add(sprite);

      // Сохраняем данные объекта
      container.setData("index", gameObject.index);
      container.setData("type", gameObject.type);
      container.setData("hp", gameObject.hp);
      container.setData("name", gameObject.name);
      container.setData("enemy", gameObject.enemy);

      // Добавляем анимацию появления
      this.addEnemyEffects(container);

      console.log(
        `Создан enemy объект: ${gameObject.name} в позиции (${coord.x}, ${coord.y})`
      );

      return sprite;
    } catch (error) {
      console.error(`Ошибка при создании объекта ${gameObject.name}:`, error);
    }
  }

  private addEnemyEffects(container: Phaser.GameObjects.Container) {
    // Добавляем индикатор HP
    this.addHPIndicator(container);

    // Добавляем анимацию появления
    container.setScale(0);
    this.scene.tweens.add({
      targets: container,
      scale: 1,
      duration: 300,
      ease: "Back.easeOut",
    });
  }

  private addHPIndicator(container: Phaser.GameObjects.Container) {
    const bounds = container.getBounds();

    // Фон для HP бара
    const hpBarBg = this.scene.add.rectangle(
      0,
      -bounds.height / 2 - 10,
      bounds.width,
      6,
      0x333333
    );

    // HP бар
    const hpBar = this.scene.add.rectangle(
      0,
      -bounds.height / 2 - 10,
      bounds.width,
      6,
      0xff0000
    );

    container.add(hpBarBg);
    container.add(hpBar);

    // Сохраняем ссылку на HP бар для обновления
    container.setData("hpBar", hpBar);
    container.setData("hpBarWidth", bounds.width);
  }

  // Метод для обновления HP объекта
  public updateObjectHP(index: number, newHP: number) {
    const object = this.enityObject.find(
      (obj) => obj.getData("index") === index
    );
    if (object) {
      object.setData("hp", newHP);

      // Обновляем HP бар
      const hpBar = object.getData("hpBar");
      const hpBarWidth = object.getData("hpBarWidth");
      const maxHP = 100; // или получите из конфигурации

      if (hpBar && hpBarWidth) {
        const hpPercent = Math.max(0, newHP / maxHP);
        hpBar.setDisplaySize(hpBarWidth * hpPercent, 6);
      }

      // Если HP <= 0, уничтожаем объект
      if (newHP <= 0) {
        this.destroyObject(index);
      }
    }
  }

  // Метод для уничтожения объекта
  public destroyObject(index: number) {
    const objectIndex = this.enityObject.findIndex(
      (obj) => obj.getData("index") === index
    );
    if (objectIndex !== -1) {
      const object = this.enityObject[objectIndex];

      // Анимация уничтожения
      this.scene.tweens.add({
        targets: object,
        scale: 0,
        alpha: 0,
        duration: 800,
        ease: "Power2",
        onComplete: () => {
          object.destroy();
        },
      });

      // Удаляем из массива
      this.enityObject.splice(objectIndex, 1);

      console.log(`Уничтожен enemy объект с индексом ${index}`);
    }
  }
}
