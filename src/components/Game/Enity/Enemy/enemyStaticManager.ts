import { EnityManager } from "../enityManager";
import * as Phaser from "phaser";
import { store } from "@/Api/store";
import { FieldCell } from "@/type/gameHelpers";

export class EnemyStaticManager extends EnityManager {
  private gameObjectsCount = 0;

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.setupGameObjectTracking();
  }

  setupGameObjectTracking() {
    // Дополнительная подписка специально для отслеживания gameObject
    const gameObjectUnsubscribe = store.subscribe(() => {
      const state = store.getState();
      const currentField = state.mainGame.field;

      // Считаем количество gameObject с enemy флагом
      const currentGameObjectsCount = currentField.filter(
        (cell) => cell.gameObject?.enemy
      ).length;

      if (currentGameObjectsCount !== this.gameObjectsCount) {
        console.log(
          `Количество enemy gameObject изменилось: ${this.gameObjectsCount} -> ${currentGameObjectsCount}`
        );

        // Если количество увеличилось - нашли новые объекты
        if (currentGameObjectsCount > this.gameObjectsCount) {
          this.handleNewEnemyObjects(currentField);
        }

        this.gameObjectsCount = currentGameObjectsCount;
      }
    });

    // Очистка при завершении сцены
    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      gameObjectUnsubscribe();
    });
  }

  private handleNewEnemyObjects(field: FieldCell[]) {
    // Находим все ячейки с enemy объектами
    const enemyObjects = field.filter((cell) => cell.gameObject?.enemy);

    // Обрабатываем каждый новый объект
    enemyObjects.forEach((cell) => {
      if (cell.gameObject) {
        // Проверяем, не создан ли уже этот объект
        const existingObject = this.enityObject.find(
          (obj) => obj.getData("index") === cell.gameObject!.index
        );
        console.log(existingObject);
        if (!existingObject) {
          this.choiseEnityObject(
            cell.gameObject.index,
            cell.gameObject.name,
            true
          );
        }
      }
    });
  }
}
