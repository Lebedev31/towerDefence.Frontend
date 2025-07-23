// enum стелковых башен

export enum RifleTowers {
  RegularShootingTower = "regularShootingTower",
}

export enum RifleTowersPatch {
  RegularShootingTowerPatch = "/assets/imgGame/стрелковая.png",
}

// enum магческих башен

export enum MagicTowers {
  RegularMagicTower = "regularMagicTower",
}

export enum MagicTowersPatch {
  RegularMagicTowerPatch = "/assets/imgGame/магическая.png",
}

// enum артилерийских башен

export enum ArtilleryTowers {
  RegularArtilleryTower = "regularArtileryTower",
  RocketLauncherTower = "rocketLauncherTower",
}

export enum ArtilleryTowersPatch {
  RegularArtilleryTowerPatch = "/assets/imgGame/артилерия.png",
  RocketLauncherTowerPatch = "/assets/imgGame/ракетница.png",
}

// тип координат башни
export type CoordinatesTower = {
  x: number; // координата x
  y: number; // координата y
  pathImg: string; // путь к изображению башни
};
