// src/app/game/preload/page.tsx
"use client";

import styles from "@/styles/game/preloadMenu.module.scss";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setTypeGame } from "@/Api/Slice/mainGameSlice";
import { AppDispatch } from "@/Api/store";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useProccesingSocketGameEventQuery } from "@/Api/ApiSlice/game.api.slice";
import { useSelector } from "react-redux";
import { RootState } from "@/Api/store";

function Preload() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const config = useSelector(
    (state: RootState) => state.mainGame.configuration
  );
  useProccesingSocketGameEventQuery();

  useEffect(() => {
    if (config) {
      setLoader(true);
      router.push("/game");
    }
  }, [config, router]);

  const onChoose = (type: "defence" | "attack") => {
    dispatch(setTypeGame(type));
    setLoader(true);
  };

  return (
    <div className={styles.preload}>
      <h2>Выберите режим</h2>
      <div className={styles.preload__buttons}>
        <button
          className={styles.preload__button}
          onClick={() => onChoose("defence")}
          disabled={loader}
        >
          Защита
        </button>

        <button
          className={styles.preload__button}
          onClick={() => onChoose("attack")}
          disabled={loader}
        >
          Атака
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {loader && <ClipLoader size={50} color="#36d7b7" />}
      </div>
    </div>
  );
}

export default Preload;
