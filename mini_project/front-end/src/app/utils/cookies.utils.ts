"use server";

import { cookies } from "next/headers";

const cookieOptions = { maxAge: 1000 * 60 * 60 * 24 };

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(name);
};

export const storeApiCookie = async (name: string, cookiesHeader: string[]) => {
  try {
    const cookieStore = await cookies();
    const foundCookie = cookiesHeader
      ?.find((cookie) => cookie.includes(name))
      ?.split("=")[1];
    if (!foundCookie) {
      throw new Error("Cookie not found");
    }
    cookieStore.set(name, foundCookie, cookieOptions);
    return foundCookie;
  } catch (error) {
    console.error(error);
  }
};

export const storeCookie = async (name: string, value: string) => {
  try {
    const cookieStore = await cookies();
    cookieStore.set(name, value, cookieOptions);
  } catch (error) {
    console.error(error);
  }
};
