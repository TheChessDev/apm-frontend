"use server";

import { HttpSDK } from "@chessdev/apm-sdk-demo";

export const getMessages = async (topic: string) => {
  const sdk = new HttpSDK(
    "http://localhost:3000",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiVGhlQ2hlc3NEZXYiLCJpYXQiOjE3NDI3OTY1NjUsImV4cCI6MTc0MzY5NjU2NX0.-Q-g4OEubCxLSdqwmHNOvQ7hQky1Kk30O5J35DZTJyU",
  );

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

  const sdk = new HttpSDK(
    "http://localhost:3000",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiVGhlQ2hlc3NEZXYiLCJpYXQiOjE3NDI3OTY1NjUsImV4cCI6MTc0MzY5NjU2NX0.-Q-g4OEubCxLSdqwmHNOvQ7hQky1Kk30O5J35DZTJyU",
  );

  return sdk.send(topic, message);
};

export const pollMessages = async (topic: string) => {};
