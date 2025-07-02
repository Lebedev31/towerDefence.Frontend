import { ConnectDropTarget, useDrop } from "react-dnd";

export function useTowerDropHook(): ConnectDropTarget {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "tower", // Принимаем все типы из ItemTypes
    drop: (item, monitor) => {
      // Это событие срабатывает, когда элемент "брошен" над этой областью
      const clientOffset = monitor.getClientOffset(); // Координаты курсора относительно окна браузера
      if (clientOffset) {
        console.log(clientOffset);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return drop;
}
