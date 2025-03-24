"use client";

import type { ReactNode } from "react";
import { createContext, use, useEffect, useState } from "react";
import { TopicContext } from "./TopicContext";

export const SubscriberContext = createContext<string[]>([]);
export const SubscriberDispatchContext = createContext<{
  addSubscriber: () => void;
  removeSubscriber: (id: string) => void;
} | null>(null);

type Props = {
  children: ReactNode;
};

export function SubscriberProvider({ children }: Props) {
  const topic = use(TopicContext);
  const [subscribers, setSubscribers] = useState<string[]>([]);

  useEffect(() => {
    setSubscribers([]);
  }, [topic]);

  const addSubscriber = () => {
    const newId = `Subscriber-${Date.now()}`;
    setSubscribers((prev) => [...prev, newId]);
  };

  const removeSubscriber = (id: string) => {
    setSubscribers((prev) => prev.filter((subscriber) => subscriber !== id));
  };

  return (
    <SubscriberContext.Provider value={subscribers}>
      <SubscriberDispatchContext.Provider
        value={{ addSubscriber, removeSubscriber }}
      >
        {children}
      </SubscriberDispatchContext.Provider>
    </SubscriberContext.Provider>
  );
}
