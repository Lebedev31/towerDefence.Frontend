/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { useDrag } from "react-dnd";

type PropsDragTower = {
  pathImg: string;
  nameImg: string;
};
function DragTower({ pathImg, nameImg }: PropsDragTower) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "tower",
    item: { nameImg }, // Передаем данные о типе башни и ее изображении
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return drag(
    <div style={{ cursor: "pointer" }}>
      <Image width={50} height={50} alt="башня" src={pathImg} />
    </div>
  );
}

export default DragTower;
