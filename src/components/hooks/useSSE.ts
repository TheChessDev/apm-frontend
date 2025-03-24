"use client";

import { Message } from "@chessdev/apm-sdk-demo";
import { useEffect, useRef, useState } from "react";

export function useSSE(url: string) {
  const [data, setData] = useState<Message | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [url]);

  const cancel = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  return { data, cancel };
}
