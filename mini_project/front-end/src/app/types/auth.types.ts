import { UserDataType } from "./user.types";

export interface AuthStore {
  token: string;
  user: UserDataType | null;
  isLoading: boolean;
  error: string | null;

  fetchLogin: (email: string, password: string) => Promise<void>;
  getCookiesToken: () => Promise<void>;
  resetError: () => void;
  logout: () => void;
}

export interface LoginResponse {
  token: string;
}
