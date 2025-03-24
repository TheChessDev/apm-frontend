"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useState } from "react";

export const TopicContext = createContext<string>("");
export const TopicDispatchContext = createContext<Dispatch<
  SetStateAction<string>
> | null>(null);

type Props = {
  children: ReactNode;
};

export function TopicProvider({ children }: Props) {
  const [topic, setTopic] = useState<string>("");
  return (
    <TopicContext.Provider value={topic}>
      <TopicDispatchContext.Provider value={setTopic}>
        {children}
      </TopicDispatchContext.Provider>
    </TopicContext.Provider>
  );
}
