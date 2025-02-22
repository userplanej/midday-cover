"use client";

import type { ClientMessage } from "@/actions/ai/types";
import { useEnterSubmit } from "@/hooks/use-enter-submit";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { useAssistantStore } from "@/store/assistant";
import { ScrollArea } from "@midday/ui/scroll-area";
import { Textarea } from "@midday/ui/textarea";
import { readStreamableValue, useActions } from "ai/rsc";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import { ChatEmpty } from "./chat-empty";
import { ChatExamples } from "./chat-examples";
import { ChatFooter } from "./chat-footer";
import { ChatList } from "./chat-list";
import { UserMessage } from "./messages";
import { generateCompletion } from "@/actions/ai/chat/generate-completion";
import { generatePath, MiddayAgentState } from "@/actions/ai/chat";

export function Chat({
  completion,
  submitChat,
  messages,
  submitMessage,
  user,
  onNewChat,
  input,
  setInput,
  showFeedback,
}) {
  const { financialAssistant ,ecommerceAssistant, automationAssistant, generalAssistant} = useActions();
  const { formRef, onKeyDown } = useEnterSubmit();
  const ref = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { message } = useAssistantStore();

  const onSubmit = async (input: string) => {
    const value = input.trim();

    if (value.length === 0) {
      return null;
    }

    setInput("");
    scrollToBottom();

    submitMessage((message: ClientMessage[]) => [
      ...message,
      {
        id: nanoid(),
        role: "user",
        display: <UserMessage>{value}</UserMessage>,
      },
    ]);

    let artifact = '';
    const streamableCompletion = await generateCompletion(value);
    submitChat("좋은 하루 보내고 계신가요 ?📣");
    for await (const text of readStreamableValue(streamableCompletion)) {
      // console.log(text);
      submitChat(text ?? '');
      artifact = text ?? '';
    }
    // set loading-spinner done
    let responseMessage;
    const category = await generatePath(value, artifact);
    
    switch (category.category) {
      case "financial":
        console.log('category financial');
        responseMessage = await financialAssistant(value ,artifact);
        break;
      case 'ecommerce':
        console.log('category ecommerce');
        responseMessage = await ecommerceAssistant(value ,artifact);
        break;
      case 'automation':
        console.log('category automation');
        responseMessage = await automationAssistant(value ,artifact);
        break;
      case 'knowledge':
        console.log('category knowledge');
        responseMessage = await generalAssistant(value ,artifact);
        break;
      case 'exception':
        console.log('category exception');
        responseMessage = await generalAssistant(value ,artifact);
        break;
    }

  
    submitMessage((messages: ClientMessage[]) => [
      ...messages,
      responseMessage,
    ]);
  };

  useEffect(() => {
    if (!ref.current && message) {
      onNewChat();
      onSubmit(message);
      ref.current = true;
    }
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef?.current.focus();
    });
  }, [messages]);

  const { messagesRef, scrollRef, visibilityRef, scrollToBottom } =
    useScrollAnchor();

  const showExamples = messages.length === 0 && !input;

  return (
    <div className="relative">
      <ScrollArea className="todesktop:h-[335px] md:h-[335px]" ref={scrollRef}>
        <div ref={messagesRef}>
          
          {messages.length || completion ? (
            <ChatList completion={completion} messages={messages} className="p-4 pb-8" />
          ) : (
            <ChatEmpty firstName={user?.full_name.split(" ").at(0)} />
          )}

          <div className="w-full h-px" ref={visibilityRef} />
        </div>
      </ScrollArea>

      <div className="fixed bottom-[1px] left-[1px] right-[1px] todesktop:h-[88px] md:h-[88px] bg-background border-border border-t-[1px]">
        {showExamples && <ChatExamples onSubmit={onSubmit} />}

        <form
          ref={formRef}
          onSubmit={(evt) => {
            evt.preventDefault();
            onSubmit(input);
          }}
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            rows={1}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            value={input}
            className="h-12 min-h-12 pt-3 resize-none border-none"
            placeholder="온라인 주문목록을 확인해보세요."
            onKeyDown={onKeyDown}
            onChange={(evt) => {
              setInput(evt.target.value);
            }}
          />
        </form>

        <ChatFooter
          onSubmit={() => onSubmit(input)}
          onNewChat={onNewChat}
          showFeedback={showFeedback}
        />
      </div>
    </div>
  );
}
