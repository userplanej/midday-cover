import { Icons } from "@midday/ui/icons";
import Image from "next/image";
import strawberry from 'public/strawberry.jpg';

type Props = {
  firstName: string;
};

export function ChatEmpty({ firstName }: Props) {
  return (
    <div className="w-full  mt-6 todesktop:mt-12 md:mt-12 flex flex-col items-center justify-items-start text-center">
        
      <span className=" mt-6">
        안녕하세요 {firstName}, 무엇을  
        도와드릴까요?
      </span>
    </div>
  );
}
