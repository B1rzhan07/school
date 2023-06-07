export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginError = {
  outOfDate: boolean;
  values: LoginRequest;
};

export interface ILogin {
  authenticationToken: string;
  email: string;
  role: string;
  refreshToken: string;
  expiresAt: number[];
}
