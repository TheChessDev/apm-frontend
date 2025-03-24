"use client";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

interface TopicSelectorProps {
  initialTopics?: string[];
  onTopicSelected?: (topic: string) => void;
  className?: string;
}

export function TopicSelector({
  initialTopics = ["demo-topic", "another-topic", "test-topic"],
  onTopicSelected,
  className,
}: TopicSelectorProps) {
  const [topics, setTopics] = useState<string[]>(initialTopics);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);

  const filteredTopics = useMemo(
    () =>
      topics.filter((t) => t.toLowerCase().includes(searchValue.toLowerCase())),
    [topics, searchValue],
  );

  const handleSelect = (topic: string) => {
    if (onTopicSelected) {
      onTopicSelected(topic);
    }
    setSearchValue(topic);
    setOpen(false);
  };

  const handleCreate = () => {
    const newTopic = searchValue.trim();
    if (!newTopic) return;

    if (!topics.includes(newTopic)) {
      setTopics((prev) => [...prev, newTopic]);
    }
    handleSelect(newTopic);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[240px] justify-between", className)}
        >
          {searchValue || "Select or create a topic"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[240px]">
        <Command>
          <CommandInput
            placeholder="Search or create topic..."
            value={searchValue}
            onValueChange={(val) => {
              setSearchValue(val);
            }}
            autoFocus
          />
          <CommandList className="max-h-48 overflow-auto">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {filteredTopics.map((topic) => (
                <CommandItem key={topic} onSelect={() => handleSelect(topic)}>
                  {topic}
                </CommandItem>
              ))}
            </CommandGroup>
            {searchValue.trim() &&
              !filteredTopics.includes(searchValue.trim()) && (
                <CommandItem onSelect={handleCreate} className="text-green-400">
                  Create “{searchValue.trim()}”
                </CommandItem>
              )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
