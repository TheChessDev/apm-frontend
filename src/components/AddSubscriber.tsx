import { use } from "react";
import { SubscriberDispatchContext } from "./SubscriberContext";
import { Button } from "./ui/button";
import { TopicContext } from "./TopicContext";

export function AddSubscriber() {
  const context = use(SubscriberDispatchContext);
  const topic = use(TopicContext);

  return (
    <Button
      variant="outline"
      disabled={!context || !topic}
      onClick={() => context?.addSubscriber()}
    >
      Add Subscriber
    </Button>
  );
}
