"use client";
import styles from "@/styles/game/towerMenu.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/Api/store";
import Image from "next/image";
import { FieldCell } from "@/type/gameHelpers";

function TowerMenu() {
  const menu = useSelector((state: RootState) => state.towerMenu);
  const field = useSelector((state: RootState) => state.mainGame.field); // Предполагаем, что поле доступно в store

  // Примеры путей к изображениям (замените на свои)
  const towerImages = [
    "/assets/imgMenu/выбратьцель.png",
    "/assets/imgMenu/заклинание.png",
    "/assets/imgMenu/повысить уровень.png",
    "/assets/imgMenu/преобразование.png",
  ];

  // Заглушки для чисел
  const towerLevels = [10, 20, 30, 40];

  const getMenuPosition = (towerCell: FieldCell) => {
    if (!towerCell) return { top: 100, left: 100 };

    const cellCenterX = (towerCell.x1 + towerCell.x2) / 2;
    const cellCenterY = (towerCell.y1 + towerCell.y2) / 2;

    // Размеры меню
    const menuWidth = 120;
    const menuHeight = 40;

    let top: number;
    let left: number;

    // Если башня на верхней строке, располагаем меню ниже башни
    if (towerCell.cellY === 0) {
      top = towerCell.y2 + 5; // На 5px ниже нижнего края ячейки
    } else {
      // Для всех остальных случаев - строго по центру башни со смещением вверх
      top = cellCenterY - menuHeight / 2 - 50;
    }

    // Базовая позиция по центру
    left = cellCenterX - menuWidth / 2;

    // Смещение для крайних колонок
    if (towerCell.cellX === 0) {
      // Левая колонка - смещаем вправо
      left += 30;
    } else if (towerCell.cellX === 24) {
      // Правая колонка (25-1) - смещаем влево
      left -= 30;
    }

    return { top, left };
  };

  const menuPosition = getMenuPosition(field[menu.square]);

  return (
    <div
      className={styles.towerMenu}
      style={{
        display: menu.isOpen ? "flex" : "none",
        top: `${menuPosition.top}px`,
        left: `${menuPosition.left}px`,
      }}
    >
      {towerImages.map((img, index) => (
        <div
          key={index}
          className={styles.towerItem}
          onClick={() => console.log(`Clicked tower ${index + 1}`)}
        >
          <div className={styles.imageContainer}>
            <Image
              src={img}
              alt={`Tower ${index + 1}`}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.level}>{towerLevels[index]}</div>
        </div>
      ))}
    </div>
  );
}

export default TowerMenu;
