import { useAssistantStore } from "@/store/assistant";
import { Button } from "@midday/ui/button";
import { Icons } from "@midday/ui/icons";
import { Experimental } from "../experimental";
import { Toolbar } from "./toolbar";

type Props = {
  isExpanded: boolean;
  onNewChat: () => void;
  toggleSidebar: () => void;
};

export function Header({ toggleSidebar, onNewChat, isExpanded }: Props) {
  const { setOpen } = useAssistantStore();

  return (
    <div className="px-4 py-3 flex justify-between items-center border-border border-b-[1px]">
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="icon"
          className="size-8 z-50 p-0"
          onClick={toggleSidebar}
        >
          {isExpanded ? (
            <Icons.SidebarFilled width={18} />
          ) : (
            <Icons.Sidebar width={18} />
          )}
        </Button>
      </div>

      <Button
        className="flex md:hidden todesktop:hidden"
        
        variant="ghost"
        onClick={() => setOpen()}
      >
       
        <div className=" flex items-center justify-center">
          <div className="  dark:text-white  rounded-full  h-6 w-full justify-between items-center flex px-2 space-x-2 text-[#878787]">
              
              <span className="text-xs">Close</span>
              <Icons.Close />
          
          </div>
      </div>
      </Button>

      <div className="space-x-2 items-center  md:flex todesktop:flex">
        <Toolbar onNewChat={onNewChat} />
        
      </div>
    </div>
  );
}
