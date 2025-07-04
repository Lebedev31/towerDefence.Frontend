import styles from "@/styles/game/interfaceGame.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/Api/store";
import DragTower from "./DragTower";
import {
  RifleTowersPatch,
  MagicTowersPatch,
  ArtilleryTowersPatch,
  RifleTowers,
  MagicTowers,
  ArtilleryTowers,
} from "@/type/type";

function InterfaceGame() {
  const typeGame = useSelector((state: RootState) => state.mainGame.typeGame);
  return (
    <div className={styles.intefaceGame}>
      <div className={styles.intefaceGame__user}>
        <Image
          src={"/assets/img/art1.png"}
          width={80}
          height={90}
          alt="автар"
        />
        <div className={styles.intefaceGame__name}>
          <p>Петрович</p>
          <div className={styles.intefaceGame__typeGame__img}>
            <Image
              src={
                typeGame === "defence"
                  ? "/assets/imgGame/щит.png"
                  : "/assets/imgGame/атака.png"
              }
              width={40}
              height={40}
              alt="значек"
            />
          </div>
        </div>
      </div>
      <div className={styles.intefaceGame__tower}>
        <DragTower
          pathImg={RifleTowersPatch.RegularShootingTowerPatch}
          nameImg={RifleTowers.RegularShootingTower}
        />
        <DragTower
          pathImg={MagicTowersPatch.RegularMagicTowerPatch}
          nameImg={MagicTowers.RegularMagicTower}
        />
        <DragTower
          pathImg={ArtilleryTowersPatch.RegularArtilleryTowerPatch}
          nameImg={ArtilleryTowers.RegularArtilleryTower}
        />
        <DragTower
          pathImg={ArtilleryTowersPatch.RocketLauncherTowerPatch}
          nameImg={ArtilleryTowers.RocketLauncherTower}
        />
      </div>
    </div>
  );
}

export default InterfaceGame;
