import { ConnectDropTarget, useDrop } from "react-dnd";
import { DragProps, CoordinatesTower } from "@/type/type";
import { AppDispatch } from "@/Api/store";
import { useDispatch } from "react-redux";
import { setCoordinatesTower } from "@/Api/Slice/mainGameSlice";

export function useTowerDropHook(): ConnectDropTarget {
  const dispatch: AppDispatch = useDispatch();
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "tower", // Принимаем все типы из ItemTypes
    drop: (item: DragProps, monitor) => {
      // Это событие срабатывает, когда элемент "брошен" над этой областью
      console.log(item);
      const clientOffset = monitor.getClientOffset(); // Координаты курсора относительно окна браузера
      if (clientOffset) {
        const coordinates: CoordinatesTower = {
          x: clientOffset.x,
          y: clientOffset.y,
          pathImg: item.nameImg,
        };
        dispatch(setCoordinatesTower(coordinates));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return drop;
}
