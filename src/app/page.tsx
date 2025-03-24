import MessageInput from "@/components/MessageInput";
import { ModeToggle } from "@/components/mode-toggle";
import { TopicSelector } from "@/components/SelectTopicDropdown";

export default function Home() {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/3 p-4">
        <div className="h-full flex flex-col items-center">
          <div className="w-90 flex justify-center">
            <TopicSelector />
          </div>
          <div className="mt-auto w-90">
            <MessageInput />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end border-l-1">
        <div className="h-16 ml-auto p-4 ">
          <ModeToggle />
        </div>

        <div className="flex-1 p-4 overflow-auto">
          <p>Subscribers</p>
        </div>
      </div>
    </div>
  );
}
