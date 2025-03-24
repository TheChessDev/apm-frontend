"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { MessagesProvider } from "./MessageContext";
import MessageInput from "./MessageInput";
import { MessagesList } from "./MessagesList";
import { ModeToggle } from "./mode-toggle";
import { TopicSelector } from "./SelectTopicDropdown";
import { SubscriberList } from "./SubscriberList";
import { TopicProvider } from "./TopicContext";
import { AddSubscriber } from "./AddSubscriber";
import { SubscriberProvider } from "./SubscriberContext";

type Props = {
  topics: string[];
};

export function App({ topics }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TopicProvider>
        <MessagesProvider>
          <SubscriberProvider>
            <div className="flex h-screen w-screen">
              <div className="w-1/3 p-4">
                <div className="h-full flex flex-col items-center">
                  <div className="w-90 flex justify-center">
                    <TopicSelector initialTopics={topics} />
                  </div>
                  <MessagesList />
                  <div className="mt-auto w-90">
                    <MessageInput />
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-end ">
                <div className="h-16 flex p-4 ">
                  <AddSubscriber />
                  <div className="ml-auto">
                    <ModeToggle />
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-auto">
                  <SubscriberList />
                </div>
              </div>
            </div>
          </SubscriberProvider>
        </MessagesProvider>
      </TopicProvider>
    </QueryClientProvider>
  );
}
