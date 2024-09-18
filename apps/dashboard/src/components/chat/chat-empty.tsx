import { Icons } from "@midday/ui/icons";
import Image from "next/image";
import strawberry from 'public/strawberry.jpg';

type Props = {
  firstName: string;
};

export function ChatEmpty({ firstName }: Props) {
  return (
    <div className="w-full mt-[0px] todesktop:mt-12 md:mt-12 flex flex-col items-center justify-items-start text-center">
         <div className="relative size-36 bg-zinc-200 flex-shrink-0 rounded-lg">
            <Image
              src={strawberry}
              alt={"strawberry"}
              fill
              sizes="(max-width: 768px) 24px, 24px"
              className="object-cover"
            />
          </div>
      <span className=" mt-6">
        안녕하세요 {firstName}, 무엇을  <br />
        도와드릴까요?
      </span>
    </div>
  );
}
