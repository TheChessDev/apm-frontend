"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";
import { use } from "react";
import { createMessage } from "./actions/messages";
import { TopicContext } from "./TopicContext";
import { useQueryClient } from "@tanstack/react-query";

export default function MessageCard() {
  const topic = use(TopicContext);
  const queryClient = useQueryClient();

  const handleSubmit = async (formData: FormData) => {
    await createMessage(topic, formData);
    queryClient.invalidateQueries({ queryKey: ["messages", topic] });
  };

  return (
    <form action={handleSubmit}>
      <div className="flex">
        <Input
          name="message"
          className="flex-1 bg-transparent border-zinc-700 placeholder:text-zinc-500 text-white"
          placeholder="Type your message..."
          disabled={!topic}
          required
        />
        <Button
          variant="ghost"
          className="text-white hover:bg-zinc-800"
          type="submit"
          disabled={!topic}
        >
          <SendHorizonal className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
