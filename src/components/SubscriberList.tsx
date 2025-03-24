"use client";

import { use } from "react";
import { SubscriberCard } from "./SubscriberCard";
import {
  SubscriberContext,
  SubscriberDispatchContext,
} from "./SubscriberContext";

export function SubscriberList() {
  const subscribers = use(SubscriberContext);
  const context = use(SubscriberDispatchContext);

  return (
    <div className="grid grid-flow-row-dense lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
      {(subscribers ?? []).map((id: string) => (
        <div className="space-y-4" key={id}>
          <SubscriberCard
            id={id}
            onDisconnect={() => context?.removeSubscriber(id)}
          />
        </div>
      ))}
    </div>
  );
}
