"use client";
import FigureWarsGame from "@/components/Game/FigureWarsGame";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Game() {
  return (
    <DndProvider backend={HTML5Backend}>
      <FigureWarsGame />
    </DndProvider>
  );
}

export default Game;
