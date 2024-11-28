"use client";

import type { ClientMessage } from "@/actions/ai/types";
import { cn } from "@midday/ui/cn";
import { BotReason } from "./messages";

type Props = {
  completion: string;
  messages: ClientMessage[];
  className?: string;
};

export function ChatList({ messages, className , completion}: Props) {
  

  if (!messages.length) {
    return null;
  }

  const  textNode = <BotReason content={completion} />

  return (
    <div className={cn("flex flex-col", className)}>
      {messages
        .filter((tool) => tool.display !== undefined)
        .map((message, index) => (
          <div key={message.id}>
            { message.role === 'assistant' ? (
                <>
                  <div className="my-4" />
                  {message.display}
                </>
              ) 
              : message.role === 'user' ? (  
                <>
                  <div className="my-4" />
                  {message.display}
                  <div className="my-4" />
                  {textNode}
                </>

              )
              :
              (  
                <div className="my-1" />
              )
             
            }
          </div>
        ))}
    </div>
  );
}
