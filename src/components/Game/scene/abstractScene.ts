import * as Phaser from "phaser";
import { store } from "@/Api/store";
import { FieldCell, AddTowerCoordinates } from "@/type/gameHelpers";
import { initField } from "@/Api/Slice/mainGameSlice";

export abstract class SupportSceneAbctract {
  public field!: FieldCell[];
  protected width!: number;
  protected height!: number;
  protected scene!: Phaser.Scene;
  protected unsubscribe?: () => void;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.width = scene.sys.game.config.width as number;
    this.height = scene.sys.game.config.height as number;
    store.dispatch(initField({ width: this.width, height: this.height }));
    this.field = store.getState().mainGame.field;
    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();
      if (state.mainGame.field !== this.field) {
        this.field = state.mainGame.field;
      }
    });

    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.unsubscribe?.();
    });
  }

  getCenterSquare(index: number): AddTowerCoordinates | undefined {
    if (index !== -1) {
      const square = this.field[index];
      const centerX = square.x1 + (square.x2 - square.x1) / 2;
      const centerY = square.y1 + (square.y2 - square.y1) / 2;
      return {
        x: centerX,
        y: centerY,
        square,
        index,
      };
    }
  }
}
