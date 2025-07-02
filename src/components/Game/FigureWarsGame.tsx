"use client";
import { useEffect, useRef } from "react";
import styles from "@/styles/game/game.module.scss";
import InterfaceGame from "./InterfaceGame/InterfaceGame";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function FigureWarsGame() {
  const gameRef = useRef(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const loadGame = async () => {
      try {
        // Динамический импорт Phaser только на клиенте
        const Phaser = await import("phaser");
        const { config } = await import("./config/config");

        if (gameRef.current) {
          const gameConfig = config(gameRef.current);
          const game = new Phaser.Game(gameConfig);

          // Cleanup функция
          return () => {
            game.destroy(true);
          };
        }
      } catch (error) {
        console.error("Ошибка загрузки игры:", error);
      }
    };

    let cleanup: (() => void) | undefined;

    loadGame().then((cleanupFn) => {
      cleanup = cleanupFn;
    });

    // Cleanup при размонтировании компонента
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div ref={gameRef} className={styles.game}></div>
        <InterfaceGame />
      </DndProvider>
    </>
  );
}

export default FigureWarsGame;
