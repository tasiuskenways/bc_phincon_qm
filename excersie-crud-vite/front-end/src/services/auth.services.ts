import { encrypt } from "@/utils/encrypt.utils";
import { ResponseType } from "@/types/ResponseType";

const AUTH_API_URL = `${import.meta.env.VITE_API_URL}/auth`;

interface LoginResponseType {
  token: string;
}

class UserService {
  async fetchLogin(
    username: string,
    password: string
  ): Promise<ResponseType<LoginResponseType>> {
    console.log(username, password);
    const req = encrypt(JSON.stringify({ username, password }));
    console.log(req);

    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: req }),
    });

    return response.json();
  }
}

export default new UserService();
