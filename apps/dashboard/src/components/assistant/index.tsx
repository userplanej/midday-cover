"use client";

import type { AI } from "@/actions/ai/chat";
import { getUIStateFromAIState } from "@/actions/ai/chat/utils";
import { getChat } from "@/actions/ai/storage";
import { Chat } from "@/components/chat";
import { useAIState, useUIState } from "ai/rsc";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { AssistantFeedback } from "./feedback";
import { Header } from "./header";
import { SidebarList } from "./sidebar-list";
import { BorderTrail } from "../border-trail";
import { cn } from '@/lib/utils';
import { motion } from "framer-motion";

export function Assistant() {
  const [isExpanded, setExpanded] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [chatId, setChatId] = useState();
  const [completion, setCompletion] = useState('');
  const [messages, setMessages] = useUIState<typeof AI>();
  const [aiState, setAIState] = useAIState<typeof AI>();
  const [input, setInput] = useState<string>("");

  const toggleOpen = () => setExpanded((prev) => !prev);

  const onNewChat = () => {
    const newChatId = nanoid();
    setInput("");
    setExpanded(false);
    setAIState((prev) => ({ ...prev, messages: [], chatId: newChatId }));
    setMessages([]);
    setChatId(newChatId);
  };

  const handleOnSelect = (id: string) => {
    setExpanded(false);
    setChatId(id);
  };

  useHotkeys("meta+j", () => onNewChat(), {
    enableOnFormTags: true,
  });

  useEffect(() => {
    async function fetchData() {
      const result = await getChat(chatId);

      if (result) {
        setAIState((prev) => ({ ...prev, messages: result.messages }));
        setMessages(getUIStateFromAIState(result));
      }
    }

    fetchData();
  }, [chatId]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 ,scale: 0.3}}
      animate={{ opacity: 1 ,scale: 1, transition: {type: "spring", stiffness: 400, damping: 17}}}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}

      className="overflow-hidden p-0 h-full w-full todesktop:max-w-[760px] md:max-w-[760px] md:h-[480px] todesktop:h-[480px] dark:bg-black">
      {showFeedback && (
        <AssistantFeedback onClose={() => setShowFeedback(false)} />
      )}

      <SidebarList
        onNewChat={onNewChat}
        isExpanded={isExpanded}
        setExpanded={setExpanded}
        onSelect={handleOnSelect}
        chatId={chatId}
      />

      <Header toggleSidebar={toggleOpen} isExpanded={isExpanded} onNewChat={onNewChat}/>

      <Chat
        completion={completion}
        submitChat={setCompletion}
        submitMessage={setMessages}
        messages={messages}
        user={aiState.user}
        onNewChat={onNewChat}
        setInput={setInput}
        input={input}
        showFeedback={() => setShowFeedback(true)}
      />
    
      <BorderTrail
          className={cn(
            'bg-gradient-to-l from-green-300 via-green-500 to-green-300  dark:from-green-500 dark:via-orange-600 dark:to-blue-500',
           
          )}
          size={120}
          transition={{
            ease: [0, 0.5, 0.8, 0.5],
            duration: 8,
            repeat: Infinity,
          }}
        
      />

    </motion.div>
  );
}
