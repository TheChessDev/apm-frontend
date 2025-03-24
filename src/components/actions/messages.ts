"use server";

import { HttpSDK } from "@chessdev/apm-sdk-demo";

export const getMessages = async (topic: string) => {
  const sdk = new HttpSDK(process.env.SDK_BASE_URL!, process.env.SDK_TOKEN!);

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

  const sdk = new HttpSDK(process.env.SDK_BASE_URL!, process.env.SDK_TOKEN!);

  return sdk.send(topic, message);
};
