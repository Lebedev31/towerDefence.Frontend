export type AddTowerCoordinates = {
  /**
   * Координата x центра ячейки, на которую была поставлена башня
   */
  x: number;
  /**
   * Координата y центра ячейки, на которую была поставлена башня
   */
  y: number;
  /**
   * Ячейка поля, на которую была поставлена башня
   */
  square: FieldCell;
  /**
   * Индекс ячейки поля, на которую была поставлена башня
   */
  index: number;
};

export type FieldCell = {
  /**
   * Координата x левого края ячейки
   */
  x1: number;
  /**
   * Координата x правого края ячейки
   */
  x2: number;
  /**
   * Координата y верхнего края ячейки
   */
  y1: number;
  /**
   * Координата y нижнего края ячейки
   */
  y2: number;
  /**
   * Номер ячейки по x (от 1 до 25)
   */
  cellX: number;
  /**
   * Номер ячейки по y (от 1 до 10)
   */
  cellY: number;
  /**
   * Объект, который находится в этой ячейке
   */
  gameObject?: GameObject;
  /**
   * Является ли ячейка зоной смерти
   */
  deathZone: boolean;
};

export type GameObject = {
  /**
   * Тип объекта (башня или генератор)
   */
  type: "tower" | "generator";
  /**
   * Индекс объекта в массиве field
   */
  index: number;
  /**
   * Здоровье объекта
   */
  hp: number;
  /**
   * Имя объекта
   */
  name: string;
  /**
   * Является ли объект вражеским
   */
  enemy?: boolean;
};

export type CoordinatesTower = {
  x: number;
  y: number;
  pathImg: string;
};
