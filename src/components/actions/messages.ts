"use server";

import { HttpSDK } from "@chessdev/apm-sdk-demo";

export const getMessages = async (topic: string) => {
  const sdk = new HttpSDK(process.env.SDK_TOKEN!, process.env.SDK_BASE_URL!);

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

  const sdk = new HttpSDK(process.env.SDK_TOKEN!, process.env.SDK_BASE_URL!);

  return sdk.send(topic, message);
};

export const pollMessages = async (topic: string) => {
  const sdk = new HttpSDK(process.env.SDK_TOKEN!, process.env.SDK_BASE_URL!);

  return sdk.send(topic, message);
};
