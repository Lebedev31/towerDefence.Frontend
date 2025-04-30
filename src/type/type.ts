export interface Auth {
  email: string;
  password: string;
}

export interface Registration extends Auth {
  name: string;
  confirmPassword?: string;
}

export interface MessageRegistration {
  message: {
    success: boolean;
  };
}

export interface ServerError {
  status: number;
  data: {
    error: string;
    message: string;
    path: string;
    statusCode: number;
    timestamp: string;
  };
}
