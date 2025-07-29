import { SupportSceneAbctract } from "../../scene/abstractScene";
import * as Phaser from "phaser";
import { MagicShots } from "@/type/shots";
import { MagicTowers } from "@/type/towerTypes";
export class Shots extends SupportSceneAbctract {
  magicShots1: Phaser.Physics.Arcade.Group | undefined;
  constructor(scene: Phaser.Scene) {
    super(scene);
  }

  createShots(type: string) {
    switch (type) {
      case MagicTowers.RegularMagicTower:
        if (!this.magicShots1) {
          this.magicShots1 = this.scene.physics.add.group({
            defaultKey: MagicShots.MagicShots1,
            maxSize: 1,
          });
        }
        break;
    }
  }

  shoot(x: number, y: number, bulletType: string) {
    if (this.magicShots1) {
      const bullet = this.magicShots1.get(x, y, bulletType);

      if (bullet) {
        // Активируем снаряд
        bullet.setActive(true);
        bullet.setVisible(true);

        // Стреляем вправо (можете изменить направление)
        const speed = 300;
        bullet.setVelocity(speed, 0); // только по X, Y = 0

        // Поворачиваем снаряд в сторону движения (0 = вправо)
        bullet.setRotation(0);

        // Убираем снаряд через 3 секунды
        this.scene.time.delayedCall(3000, () => {
          if (bullet.active) {
            bullet.setActive(false);
            bullet.setVisible(false);
          }
        });
      }
    }
  }
}
