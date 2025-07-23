/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useRef } from "react";
import InterfaceGame from "./InterfaceGame/InterfaceGame";
import { useTowerDropHook } from "./Hooks/useTowerDropHook";
import type PhaserType from "phaser";
import { useProccesingSocketGameEventQuery } from "@/Api/ApiSlice/game.api.slice";
import styles from "@/styles/game/game.module.scss";
import { TowerMenu } from "./InterfaceGame/TowerMenu";

export default function FigureWarsGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  useProccesingSocketGameEventQuery();
  // Хранилище для игры: undefined — ещё не инициализировали,
  // "loading" — идёт импорт/инициализация,
  // иначе — реальный экземпляр Phaser.Game
  const gameInstanceRef = useRef<PhaserType.Game | "loading" | undefined>(
    undefined
  );

  const drop = useTowerDropHook();

  useEffect(() => {
    let destroyFn: (() => void) | null = null;

    const initPhaser = async () => {
      if (!containerRef.current) return;

      // Если уже есть либо в процессе загрузки ("loading"), либо готовый экземпляр — не создаём заново
      if (gameInstanceRef.current !== undefined) {
        return;
      }

      // Резервируем слот, чтобы второй вызов initPhaser не прошёл
      gameInstanceRef.current = "loading";

      try {
        const Phaser = await import("phaser");
        const { config } = await import("./config/config");

        // Настраиваем и создаём игру
        const gameConfig = config(containerRef.current);
        const game = new Phaser.Game(gameConfig);

        // Сохраняем реальный экземпляр
        gameInstanceRef.current = game;

        // Задаём функцию уничтожения
        destroyFn = () => {
          console.log("Cleaning up Phaser game instance");
          game.destroy(true);
          gameInstanceRef.current = undefined;
        };
      } catch (err) {
        console.error("Ошибка загрузки игры:", err);
        // если что-то пошло не так, сбросим реф, чтобы можно было попытаться ещё раз
        gameInstanceRef.current = undefined;
      }
    };

    initPhaser();

    return () => {
      // при размонтировании (или втором unmount в StrictMode)
      if (destroyFn) {
        destroyFn();
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
        {/* Сюда Phaser вставит одно единственное <canvas> */}
        <div ref={containerRef} className={styles.game}></div>
        <TowerMenu />
      </div>

      <InterfaceGame />
    </div>
  );
}
