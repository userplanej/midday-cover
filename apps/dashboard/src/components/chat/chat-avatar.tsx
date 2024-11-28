"use client";

import type { AI } from "@/actions/ai/chat";
import { Avatar, AvatarImage } from "@midday/ui/avatar";
import { useAIState } from "ai/rsc";
import footprints from 'public/footprints.png';

type Props = {
  role: "assistant" | "user";
};

export function ChatAvatar({ role }: Props) {

  const [aiState] = useAIState<typeof AI>();

  switch (role) {
    case "user": {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e3c4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-footprints"><path stroke="#00e3c4" d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path stroke="#00e3c4"  d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/><path stroke="#00e3c4"  d="M16 17h4"/><path stroke="#00e3c4"  d="M4 13h4"/></svg>

      );
    }

    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="#006154"
        >
          <path
            fillRule="evenodd"
            d="M11.479 0a11.945 11.945 0 0 0-5.026 1.344l5.026 8.705V0Zm0 13.952-5.026 8.704A11.946 11.946 0 0 0 11.48 24V13.952ZM12.523 24V13.946l5.028 8.708A11.943 11.943 0 0 1 12.523 24Zm0-13.946V0c1.808.078 3.513.555 5.028 1.346l-5.028 8.708Zm-10.654 8.4 8.706-5.026-5.026 8.706a12.075 12.075 0 0 1-3.68-3.68ZM22.134 5.55l-8.706 5.026 5.027-8.706a12.075 12.075 0 0 1 3.679 3.68ZM1.868 5.547a12.075 12.075 0 0 1 3.68-3.68l5.028 8.708-8.708-5.028Zm-.523.904A11.945 11.945 0 0 0 0 11.479h10.054l-8.71-5.028Zm0 11.1A11.945 11.945 0 0 1 0 12.524h10.053L1.346 17.55Zm12.606-6.072H24a11.946 11.946 0 0 0-1.345-5.026l-8.705 5.026Zm8.705 6.07-8.704-5.025H24a11.945 11.945 0 0 1-1.344 5.025Zm-9.226-4.12 5.024 8.702a12.075 12.075 0 0 0 3.678-3.678l-8.702-5.025Z"
            clipRule="evenodd"
          />
        </svg>
      );
  }
}

export function ReasonAvatar({ role }: Props) {
  const [aiState] = useAIState<typeof AI>();

  switch (role) {


    default:
      return (
        
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="#7D7D7D"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-languages"><path stroke="#7D7D7D"  d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
      );
  }
}
