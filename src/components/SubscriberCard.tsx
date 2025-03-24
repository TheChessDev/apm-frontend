"use client";

import dayjs from "dayjs";
import { use } from "react";
import { useSSE } from "./hooks/useSSE";
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

  const { data, cancel } = useSSE(`/api/pollMessages?topic=${topic}`);

  const formattedDate = data
    ? dayjs(data.createdAt).format("MMM D, YYYY h:mm A")
    : "";

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>{id}</CardTitle>
        <CardDescription>
          {data ? (
            <div className="p-2">
              (ID): {data.id} - (message): {data.name} - (date): {formattedDate}
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
            cancel();
            onDisconnect();
          }}
        >
          Disconnect
        </Button>
      </CardFooter>
    </Card>
  );
}
