"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, use, useEffect, useRef } from "react";
import { TopicContext } from "./TopicContext";
import { getMessages } from "./actions/messages";
import type { Message } from "@chessdev/apm-sdk-demo";

type MessageListProps = {
  message: string;
};

function MessageListItem({ message }: MessageListProps) {
  return (
    <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
      {message}
    </div>
  );
}

function Messages({
  topic,
  containerRef,
}: {
  topic: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { data: messages } = useSuspenseQuery({
    queryFn: async () => await getMessages(topic),
    queryKey: ["messages", topic],
  });

  useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, containerRef]);

  return (
    <Suspense fallback={<div>Loading Messages...</div>}>
      {(messages ?? []).map((message: Message) => (
        <MessageListItem message={message.name} key={message.id} />
      ))}
    </Suspense>
  );
}

export function MessagesList() {
  const topic = use(TopicContext);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!topic) {
    return (
      <div className="mt-4 mb-4 w-90 grid grid-flow-row-dense grid-cols-1 gap-4 overflow-auto" />
    );
  }

  return (
    <div
      className="mt-4 mb-4 w-90 grid grid-flow-row-dense grid-cols-1 gap-4 overflow-auto scroll-smooth"
      ref={containerRef}
    >
      <Messages topic={topic} containerRef={containerRef} />
    </div>
  );
}
