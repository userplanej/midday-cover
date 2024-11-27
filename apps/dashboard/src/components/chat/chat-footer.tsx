import { useAssistantStore } from "@/store/assistant";
import { Icons } from "@midday/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@midday/ui/popover";
import { app, platform } from "@todesktop/client-core";
import { isDesktopApp } from "@todesktop/client-core/platform/todesktop";
import { useRouter } from "next/navigation";
import { Toolbar } from "../assistant/toolbar";

type Props = {
  onSubmit: () => void;
  showFeedback: () => void;
  onNewChat: () => void;
};

export function ChatFooter({ onSubmit, showFeedback, onNewChat }: Props) {
  const router = useRouter();
  const { setOpen } = useAssistantStore();

  const handleOpenUrl = (url: string) => {
    if (isDesktopApp()) {
      return platform.os.openURL(url);
    }

    router.push(url);
  };

  return (
    <div className="hidden todesktop:flex md:flex px-3 h-[40px] w-full border-t-[1px] items-center bg-background backdrop-filter dark:border-[#2C2C2C] backdrop-blur-lg dark:bg-[#151515]/[99]">
       <Toolbar onNewChat={onNewChat} />

      <div className="ml-auto flex space-x-4">
        <button
          className="flex space-x-2 items-center text-xs"
          type="button"
          onClick={onSubmit}
        >
          <span>Submit</span>
          <kbd className="pointer-events-none h-5 select-none items-center gap-1 border bg-accent px-1.5 font-mono text-[10px] font-medium">
            <span>↵</span>
          </kbd>
        </button>
      </div>
    </div>
  );
}
