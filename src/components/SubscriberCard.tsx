"use client";

import { HttpSDK, Message } from "@chessdev/apm-sdk-demo";
import dayjs from "dayjs";
import { use, useRef, useState } from "react";
import { TopicContext } from "./TopicContext";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type Props = {
  onDisconnect: () => void;
  id: string;
};

export function SubscriberCard({ onDisconnect, id }: Props) {
  const topic = use(TopicContext);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const isRegistered = useRef(false);

  const sdk = new HttpSDK(
    process.env.NEXT_PUBLIC_SDK_BASE_URL!,
    process.env.NEXT_PUBLIC_SDK_TOKEN!,
  );

  if (topic && !isRegistered.current) {
    isRegistered.current = true;
    sdk.listen(topic, async (message: Message) => {
      setCurrentMessage(message);
    });
  }

  const formattedDate = currentMessage
    ? dayjs(currentMessage.createdAt).format("MMM D, YYYY h:mm A")
    : "";

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>{id}</CardTitle>
        <CardDescription>
          {currentMessage ? (
            <div className="p-2">
              (ID): {currentMessage.id} - (message): {currentMessage.name} -
              (date): {formattedDate}
            </div>
          ) : (
            <div className="space-y-2 p-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="destructive"
          onClick={() => {
            onDisconnect();
          }}
        >
          Disconnect
        </Button>
      </CardFooter>
    </Card>
  );
}
