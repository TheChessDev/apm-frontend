"use client";

import type { ReactNode } from "react";
import { createContext, useState } from "react";

export const SubscriberContext = createContext<string[]>([]);
export const SubscriberDispatchContext = createContext<{
  addSubscriber: () => void;
  removeSubscriber: (id: string) => void;
} | null>(null);

type Props = {
  children: ReactNode;
};

export function SubscriberProvider({ children }: Props) {
  const [subscribers, setSubscribers] = useState<string[]>([]);

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
