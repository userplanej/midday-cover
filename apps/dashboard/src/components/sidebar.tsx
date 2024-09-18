import { Cookies } from "@/utils/constants";
import { Icons } from "@midday/ui/icons";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { MainMenu } from "./main-menu";
import { TeamMenu } from "./team-menu";
import Image from "next/image";
import yourman from 'public/yourman_transparent_background.png';

export function Sidebar() {
  const initialItems = cookies().has(Cookies.MenuConfig)
    ? JSON.parse(cookies().get(Cookies.MenuConfig)?.value)
    : null;

  return (
    <aside className="h-screen flex-shrink-0 flex-col justify-between fixed top-0 ml-4 pb-4 items-center hidden md:flex">
      <div className="flex flex-col items-center justify-center">
        <div className="mt-6 todesktop:mt-[35px]">
          <div className="relative size-14 bg-zinc-200 flex-shrink-0 rounded-lg">
              <Image
                src={yourman}
                alt={"yourman"}
                fill
                sizes="(max-width: 768px) 24px, 24px"
                className="object-cover"
              />
            </div>
        </div>
        <MainMenu initialItems={initialItems} />
      </div>

      <Suspense>
        <TeamMenu />
      </Suspense>
    </aside>
  );
}
