"use client";

import type { Message } from "@chessdev/apm-sdk-demo";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useState } from "react";

export const MessagesContext = createContext<Message[]>([]);
export const MessagesDispatchContext = createContext<Dispatch<
  SetStateAction<Message[]>
> | null>(null);

type Props = {
  children: ReactNode;
};

export function MessagesProvider({ children }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  return (
    <MessagesContext.Provider value={messages}>
      <MessagesDispatchContext.Provider value={setMessages}>
        {children}
      </MessagesDispatchContext.Provider>
    </MessagesContext.Provider>
  );
}
