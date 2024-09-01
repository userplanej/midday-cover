import { cn } from "@midday/ui/cn";
import { Icons } from "@midday/ui/icons";
import { useHotkeys } from "react-hotkeys-hook";

type Props = {
  isFirst: boolean;
  isLast: boolean;
  onAction: () => void;
  onKeyPress: (direction: "down" | "up" | "left" | "right") => void;
};

export function InboxToolbar({ isFirst, isLast, onKeyPress, onAction }: Props) {
  useHotkeys(
    "arrowUp",
    () => {
      onKeyPress("up");
    },
    {
      enabled: !isFirst,
    },
  );

  useHotkeys(
    "arrowDown",
    () => {
      onKeyPress("down");
    },
    {
      enabled: !isLast,
    },
  );

  useHotkeys("arrowRight", () => {
    onKeyPress("right");
  });

  useHotkeys("arrowLeft", () => {
    onKeyPress("left");
  });

  useHotkeys("mod+backspace", () => {
    onAction();
  });

  return (
    <div className="left-0 right-0 absolute bottom-0 hidden md:flex items-center justify-center">
      <div className="backdrop-filter backdrop-blur-lg dark:bg-[#1A1A1A]/80 bg-[#F6F6F3]/80 h-10 justify-between items-center flex px-2 space-x-4 text-[#878787]">
        <button
          type="button"
          className="flex items-center space-x-2"
          onClick={() => onAction()}
        >
          <kbd className="pointer-events-none h-6 select-none items-center gap-1 border bg-accent px-1.5 font-mono text-xs font-medium flex bg-[#2C2C2C]">
            <span className="text-[16px]">⌘</span>
            <Icons.Backspace />
          </kbd>
          <span className="text-xs">Delete</span>
        </button>
        <div className="flex items-center space-x-2">
          <button type="button" onClick={() => onKeyPress("left")}>
            <kbd className="pointer-events-none h-6 select-none items-center border bg-accent px-1 font-mono text-xs font-medium flex bg-[#2C2C2C]">
              <Icons.KeyboardArrowLeft size={16} />
            </kbd>
          </button>
          <button type="button" onClick={() => onKeyPress("right")}>
            <kbd className="pointer-events-none h-6 select-none items-center border bg-accent px-1 font-mono text-xs font-medium flex bg-[#2C2C2C]">
              <Icons.KeyboardArrowRight size={16} />
            </kbd>
          </button>
          <span className="text-xs">Change tab</span>
        </div>
        <button
          type="button"
          disabled={isFirst}
          onClick={() => onKeyPress("up")}
          className={cn("flex items-center space-x-2", isFirst && "opacity-50")}
        >
          <kbd className="pointer-events-none h-6 select-none items-center gap-1 border bg-accent px-1 font-mono text-xs font-medium flex bg-[#2C2C2C]">
            <Icons.KeyboardArrowUp size={16} />
          </kbd>
          <span className="text-xs">Previous</span>
        </button>
        <button
          type="button"
          disabled={isLast}
          onClick={() => onKeyPress("down")}
          className={cn("flex items-center space-x-2", isLast && "opacity-50")}
        >
          <kbd className="pointer-events-none h-6 select-none items-center gap-1 border bg-accent px-1 font-mono text-xs font-medium flex bg-[#2C2C2C]">
            <Icons.KeyboardArrowDown size={16} />
          </kbd>
          <span className="text-xs">Next</span>
        </button>
      </div>
    </div>
  );
}
