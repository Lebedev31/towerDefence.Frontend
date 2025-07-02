"use client";
import FigureWarsGame from "@/components/Game/FigureWarsGame";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "@/styles/game/game.module.scss";

function Game() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.game}>
        <FigureWarsGame />
      </div>
    </DndProvider>
  );
}

export default Game;
