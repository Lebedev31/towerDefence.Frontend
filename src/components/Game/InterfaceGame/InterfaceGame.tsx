import styles from "@/styles/game/interfaceGame.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/Api/store";
import TowerInterfase from "./TowersInterface/TowerInterfase";
import {
  RifleTowers,
  MagicTowers,
  ArtilleryTowers,
  RifleTowersPatch,
  MagicTowersPatch,
  ArtilleryTowersPatch,
  SupportTowers,
  SupportTowersPatch,
  Generators,
  GeneratorsPatch,
} from "@/type/towerTypes";

const mockPropsTowerIntrface = [
  {
    pathImg: RifleTowersPatch.RegularShootingTowerPatch,
    nameImg: RifleTowers.RegularShootingTower,
  },
  {
    pathImg: MagicTowersPatch.RegularMagicTowerPatch,
    nameImg: MagicTowers.RegularMagicTower,
  },
  {
    pathImg: ArtilleryTowersPatch.RegularArtilleryTowerPatch,
    nameImg: ArtilleryTowers.RegularArtilleryTower,
  },
  {
    pathImg: SupportTowersPatch.RegularSupportTowerPatch,
    nameImg: SupportTowers.RegularSupportTower,
  },
];

const mockPropsTowerIntrface2 = [
  {
    pathImg: GeneratorsPatch.RegularGeneratorPatch,
    nameImg: Generators.RegularGenerator,
  },
];

function InterfaceGame() {
  const typeGame = useSelector((state: RootState) => state.mainGame.game);
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
        {typeGame === "defence" ? (
          <TowerInterfase props={mockPropsTowerIntrface} />
        ) : (
          <TowerInterfase props={mockPropsTowerIntrface2} />
        )}
      </div>
    </div>
  );
}

export default InterfaceGame;
