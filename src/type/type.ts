export interface Auth {
  email: string;
  password: string;
}

export interface Registration extends Auth {
  name: string;
  confirmPassword: string;
}
