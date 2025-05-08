"use server";

import { getEnv } from "@/app/config/env";
import { BaseResponse } from "@/app/types/base.types";
import { ExamResponse } from "@/app/types/exam.types";
import { getCookie } from "@/app/utils/cookies.utils";
import { decrypt } from "@/app/utils/encrypt.utils";
import { jwtDecode } from "jwt-decode";

export const getAllExams = async (): Promise<BaseResponse<ExamResponse[]>> => {
  try {
    const env = await getEnv();
    const token = await getCookie("auth_token");
    const decodedToken: any = jwtDecode(token?.value ?? "");

    const decryptToken = await decrypt(decodedToken.___);
    const decryptTokenData = JSON.parse(decryptToken);
    ("use cache");
    const response = await fetch(
      `${env.API_URL}exams/completed/${decryptTokenData.id}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch exams");
    }
    const json = await response.json();
    return json;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const downloadCertificate = async (examId: string) => {
  try {
    const env = await getEnv();
    const token = await getCookie("auth_token");
    const decodedToken: any = jwtDecode(token?.value ?? "");

    const decryptToken = await decrypt(decodedToken.___);
    const decryptTokenData = JSON.parse(decryptToken);
    const response = await fetch(`${env.API_URL}certificate/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ examId, userId: decryptTokenData.id }),
    });
    if (!response.ok) throw new Error("Failed to download certificate");

    const blob = await response.blob();
    return blob;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const validateCertificate = async (examId: string, userId: string) => {
  try {
    const env = await getEnv();
    const response = await fetch(
      `${env.API_URL}certificate/validate/${examId}/${userId}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    return json.data.isValid;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};
