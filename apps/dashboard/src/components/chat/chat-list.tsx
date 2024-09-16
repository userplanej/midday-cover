"use client";

import type { ClientMessage } from "@/actions/ai/types";
import { cn } from "@midday/ui/cn";
import { BotMessage } from "./messages";

type Props = {
  completion: string;
  messages: ClientMessage[];
  className?: string;
};

export function ChatList({ messages, className , completion}: Props) {
  

  if (!messages.length) {
    return null;
  }
  
  const  textNode = <BotMessage content={completion} />

  return (
    <div className={cn("flex flex-col", className)}>
      {messages
        .filter((tool) => tool.display !== undefined)
        .map((message, index) => (
          <div key={message.id}>
            {message.role === 'assistant' ? (
              <>
                {textNode}
                {message.display}
              </>
            ) : (
              message.display
            )}
            {index < messages.length - 1 && <div className="my-4" />}
          </div>
        ))}
    </div>
  );
}
