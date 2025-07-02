import Image from "next/image";
import { useDrag } from "react-dnd";

type PropsDragTower = {
  pathImg: string;
};
function DragTower({ pathImg }: PropsDragTower) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "tower",
    item: { image: pathImg }, // Передаем данные о типе башни и ее изображении
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
