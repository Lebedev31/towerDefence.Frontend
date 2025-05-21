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
