import styles from "@/styles/game/interfaceGame.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/Api/store";
import DragTower from "./DragTower";

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
        <DragTower pathImg="/assets/imgGame/магическаяБезФона1.png" />
        <DragTower pathImg="/assets/imgGame/стрелковаяБезФона1.png" />
      </div>
    </div>
  );
}

export default InterfaceGame;
