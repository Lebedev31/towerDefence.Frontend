import DragTower from "./DragTower";

interface PropsDragTower {
  pathImg: string;
  nameImg: string;
}

function TowerInterfase({ props }: { props: PropsDragTower[] }) {
  return (
    <>
      {props.map((item, index) => (
        <DragTower key={index} pathImg={item.pathImg} nameImg={item.nameImg} />
      ))}
    </>
  );
}

export default TowerInterfase;
