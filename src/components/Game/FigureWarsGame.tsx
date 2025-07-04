"use client";
import { useEffect, useRef } from "react";
import InterfaceGame from "./InterfaceGame/InterfaceGame";
import { useTowerDropHook } from "./Hooks/useTowerDropHook";

function FigureWarsGame() {
  const gameRef = useRef(null);
  const drop = useTowerDropHook();
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
    <div>
      <div
        ref={(el) => {
          if (el) drop(el);
        }}
      >
        <div ref={gameRef}></div>
      </div>

      <InterfaceGame />
    </div>
  );
}

export default FigureWarsGame;
