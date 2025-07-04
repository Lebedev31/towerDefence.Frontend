export interface Auth {
  email: string;
  password: string;
}

export interface Registration extends Auth {
  name: string;
  confirmPassword?: string;
}

export interface MessageServer {
  message: {
    success: boolean;
  };
}

export interface MessageAuth {
  message: {
    success: boolean;
    personalData: {
      id: string;
      name: string;
    };
  };
}

export interface ServerError {
  error: string;
  message: string;
  path: string;
  statusCode: number;
  timestamp: string;
}

// глобальное сообщение

export interface GlobalMessages {
  nameUser: string;
  patchAvatar: string;
  answers?: string;
  timestamp: Date;
  like: number;
  dislike: number;
  text: string;
  parentid?: string;
  messages?: GlobalMessages[];
  _id: string;
}

// отправка сообщения в глобальный чат

export interface PushGlobalMessage {
  message: string;
  answers?: string;
  parentId?: string;
}

// пропс который передается из драг в дроп при переносе башни

export type DragProps = {
  nameImg: string;
};

// enum стелковых башен

export enum RifleTowers {
  RegularShootingTower = "regularShootingTower",
}

export enum RifleTowersPatch {
  RegularShootingTowerPatch = "/assets/imgGame/стрелковаяБезФона1.png",
}

// enum магческих башен

export enum MagicTowers {
  RegularMagicTower = "regularMagicTower",
}

export enum MagicTowersPatch {
  RegularMagicTowerPatch = "/assets/imgGame/магическаяБезФона1.png",
}

// enum артилерийских башен

export enum ArtilleryTowers {
  RegularArtilleryTower = "regularArtileryTower",
  RocketLauncherTower = "rocketLauncherTower",
}

export enum ArtilleryTowersPatch {
  RegularArtilleryTowerPatch = "/assets/imgGame/орудийнаяБезФона1.png",
  RocketLauncherTowerPatch = "/assets/imgGame/ракетницаБезФона2 (1) (1).jpg",
}

// тип координат
export type CoordinatesTower = {
  x: number;
  y: number;
  pathImg: string;
};
