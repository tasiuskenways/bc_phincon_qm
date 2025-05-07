"use server";
import { getEnv } from "@/app/config/env";
import { LoginResponse } from "@/app/types/auth.types";
import { BaseResponse } from "@/app/types/base.types";
import { storeApiCookie } from "@/app/utils/cookies.utils";
import { encrypt } from "@/app/utils/encrypt.utils";

export const login = async (data: {
  email: string;
  password: string;
}): Promise<BaseResponse<LoginResponse>> => {
  try {
    const env = await getEnv();
    const reqBody = await encrypt(JSON.stringify(data));
    const response = await fetch(`${env.API_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: reqBody }),
      credentials: "include",
    });
    const json = await response.json();
    if (json?.status === "error") {
      throw new Error(json.message);
    }
    const setCookie = response.headers.getSetCookie();
    const authcookie = await storeApiCookie("auth_token", setCookie);

    return {
      ...json,
      data: {
        token: authcookie,
      },
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

// class AuthApi {
//   async login(data: {
//     email: string;
//     password: string;
//   }): Promise<BaseResponse<LoginResponse>> {
//     try {
//       const env = await getEnv();
//       const reqBody = await encrypt(JSON.stringify(data));
//       const response = await fetch(`${env.API_URL}auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ data: reqBody }),
//         credentials: "include",
//       });
//       const json = await response.json();
//       if (json?.status === "error") {
//         throw new Error(json.message);
//       }
//       const cookieStore = await cookies();
//       console.log("cookies token: ", cookieStore.get("auth_token"));

//       return json;
//     } catch (error: any) {
//       console.error(error);
//       throw new Error(error.message);
//     }
//   }
// }

// export default new AuthApi();
