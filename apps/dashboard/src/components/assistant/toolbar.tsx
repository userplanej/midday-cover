type Props = {
  onNewChat: () => void;
};

export function Toolbar({ onNewChat }: Props) {
  return (
    <button onClick={onNewChat}  type="button">
      <div className=" flex items-center justify-center">
        <div className="  dark:text-white  rounded-full  h-6 w-full justify-between items-center flex px-2 space-x-2 text-[#878787]">
            <kbd className="pointer-events-none h-5 select-none items-center gap-1.5 rounded border bg-accent px-1.5 font-mono text-[11px] font-medium flex bg-[#2C2C2C]">
              <span className="text-[16px]">⌘</span>J
            </kbd>
            <span className="text-xs">새로고침</span>
        
        </div>
      </div>
    </button>
  );
}
