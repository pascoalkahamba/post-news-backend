export interface UserCreatedI {
  name: string;
  email: string;
}

export interface CookiesProps<T> {
  key: string;
  value: T;
}

export interface NewPasswordI extends Pick<UserCreatedI, "email"> {
  newPassword: string;
  verifyEmail: boolean;
}

export interface VerifyEmailI extends Pick<UserCreatedI, "email"> {
  code: string;
}
