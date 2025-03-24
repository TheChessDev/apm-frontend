"use server";

import { refreshToken } from "@/lib/refreshToken";
import { HttpSDK } from "@chessdev/apm-sdk-demo";

export const getMessages = async (topic: string) => {
  const accessToken = await refreshToken();
  const sdk = new HttpSDK(process.env.SDK_BASE_URL!, accessToken);

  return sdk.list(topic);
};

export const createMessage = async (topic: string, formData: FormData) => {
  const messageValue = formData.get("message");

  if (!messageValue) {
    throw new Error("Name is required");
  }

  const message = {
    name: messageValue.toString(),
  };

  const accessToken = await refreshToken();
  const sdk = new HttpSDK(process.env.SDK_BASE_URL!, accessToken);

  return sdk.send(topic, message);
};
