// import { AppleSignIn } from "@/components/apple-sign-in";
import { ConsentBanner } from "@/components/consent-banner";
import { DesktopCommandMenuSignIn } from "@/components/desktop-command-menu-sign-in";
// import { GithubSignIn } from "@/components/github-sign-in";
// import { GoogleSignIn } from "@/components/google-sign-in";
import { OTPSignIn } from "@/components/otp-sign-in";
// import { SlackSignIn } from "@/components/slack-sign-in";
import { Cookies } from "@/utils/constants";
import { isEU } from "@midday/location";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@midday/ui/accordion";
import { Icons } from "@midday/ui/icons";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { userAgent } from "next/server";
import Image from "next/image";
import yourman from 'public/assistant_app_icon.png';

export const metadata: Metadata = {
  title: "Login | Midday",
};

export default async function Page(params) {
  if (params?.searchParams?.return_to === "desktop/command") {
    return <DesktopCommandMenuSignIn />;
  }

  const cookieStore = cookies();
  const preferred = cookieStore.get(Cookies.PreferredSignInProvider);
  const showTrackingConsent =
    isEU() && !cookieStore.has(Cookies.TrackingConsent);
  const { device } = userAgent({ headers: headers() });

  let preferredSignInOption =  <OTPSignIn />
  
  return (
    <div>
      <header className="w-full fixed left-0 right-0">
        <div className="ml-5 mt-4 md:ml-10 md:mt-10">
            <div className="relative size-40 flex-shrink-0 rounded-lg">
              <Image
                src={yourman}
                alt={"yourman"}
                fill
                sizes="(max-width: 768px) 160px, 160px"
                className="object-cover"
              />
            </div>
        </div>
      </header>

      <div className="flex min-h-screen justify-center items-center overflow-hidden p-6 md:p-0">
        <div className="relative z-20 m-auto flex w-full max-w-[380px] flex-col py-8">
          <div className="flex w-full flex-col relative">
            <div className="pb-4 bg-gradient-to-r from-primary dark:via-primary dark:to-[#848484] to-[#000] inline-block text-transparent bg-clip-text">
              <h1 className="font-medium pb-1 text-3xl">Login to 너의 [집사]</h1>
            </div>

            <p className="font-medium pb-1 text-2xl text-[#878787]">
              재무 업무는 자동화하고, <br /> 결정은 손쉽게 내리세요.      
            </p>

            <div className="pointer-events-auto mt-6 flex flex-col mb-6">
              {preferredSignInOption}
            </div>

       
          </div>
        </div>
      </div>

      {showTrackingConsent && <ConsentBanner />}
    </div>
  );
}
