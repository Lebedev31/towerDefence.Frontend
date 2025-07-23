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

// enum для героев обороны
export enum HeroesDefence {
  SolarKnight = "solarKnight",
}

// enum путей для героев обороны

export enum HeroesDefencePatch {
  KnightPatch = "assept/imgGame/ГеройПирожок.png",
}
