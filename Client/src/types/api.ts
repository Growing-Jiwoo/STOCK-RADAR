export interface APIError {
  code: number;
  message: string;
}

export interface APISuccess<T> {
  code: number;
  message?: string;
  data?: T;
}

export type APIResponse<T> = APIError | APISuccess<T>;
