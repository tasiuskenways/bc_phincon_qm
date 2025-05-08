"use server";

import { cookies } from "next/headers";

const cookieOptions = { maxAge: 1000 * 60 * 60 * 24 };

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(name);
};

export const storeApiCookie = async (name: string, cookiesHeader: string[]) => {
  const cookieStore = await cookies();
  const foundCookie = cookiesHeader.find((cookie) =>
    cookie.startsWith(`${name}=`)
  );
  if (!foundCookie) {
    throw new Error("Cookie not found");
  }
  cookieStore.set(name, foundCookie.split("=")[1], cookieOptions);
  return foundCookie.split("=")[1];
};

export const storeCookie = async (name: string, value: string) => {
  try {
    const cookieStore = await cookies();
    cookieStore.set(name, value, cookieOptions);
  } catch (error) {
    console.error(error);
  }
};

export async function getToken(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value ?? "";
}

export const deleteCookie = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};
