import { create } from "zustand";
import { AuthStore } from "../types/auth.types";
import { jwtDecode } from "jwt-decode";
import { decrypt } from "../utils/encrypt.utils";
import { login } from "../services/api/AuthApi";
import { getCookie } from "../utils/cookies.utils";

export const useAuthStore = create<AuthStore>((set) => ({
  token: "",
  isLoading: false,
  user: null,
  error: null,
  fetchLogin: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await login({ email, password });

      const decodedToken: any = jwtDecode(response.data.token);

      const decryptToken = await decrypt(decodedToken.___);
      const decryptTokenData = JSON.parse(decryptToken);

      set({
        isLoading: false,
        token: response.data.token,
        user: decryptTokenData,
      });
    } catch (error: any) {
      console.error(error);
      set({ isLoading: false, error: error.message });
    }
  },
  getCookiesToken: async () => {
    try {
      const token = (await getCookie("auth_token"))?.value ?? "";
      const decodedToken: any = jwtDecode(token);

      const decryptToken = await decrypt(decodedToken.___);
      const decryptTokenData = JSON.parse(decryptToken);

      set({
        isLoading: false,
        token: token,
        user: decryptTokenData,
      });
    } catch (error) {
      console.error(error);
    }
  },
  resetError: () => {
    set({ error: null });
  },
}));
