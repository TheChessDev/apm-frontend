import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

export default function MessageCard() {
  return (
    <div className="flex">
      <Input
        className="flex-1 bg-transparent border-zinc-700 placeholder:text-zinc-500 text-white"
        placeholder="Type your message..."
      />
      <Button variant="ghost" className="text-white hover:bg-zinc-800">
        <SendHorizonal className="w-4 h-4" />
      </Button>
    </div>
  );
}
