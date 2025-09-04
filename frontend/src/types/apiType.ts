export interface ApiResponse<T> {
  data: T | null;
  status: number;
  message: string;
}

export interface IUserRegisterPayload {
  name?: string;
  email: string;
  password: string;
}
