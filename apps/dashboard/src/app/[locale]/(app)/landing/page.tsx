'use client';
import "./style.css";
import { AnimatedText } from "@/components/animated-text";
import { redirect, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import localFont from "next/font/local";
import { cn } from "@midday/ui/cn";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

const DepartureMono = localFont({
  src: "./DepartureMono-Regular.woff2",
  variable: "--font-departure-mono",
});

export default function Page() {

  const [currentText, setCurrentText] = useState("Generative UI");

  const router = useRouter();

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentText("Structured Output");
    }, 4000);
    //  Agentic Workflow
    const timer2 = setTimeout(() => {
      setCurrentText("Multi-step Agentic Workflows");
    }, 8000);
    // 마지막 애니메이션 후 4초 뒤에 리다이렉트
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 12000);

    // 컴포넌트가 언마운트될 때 타이머들을 정리합니다
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div
    className={cn(
      `${DepartureMono.variable} ${GeistSans.variable} ${GeistMono.variable}`,
      "antialiased  bg-black text-white",
    )}
  >
    <div className="h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute -top-[118px] inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4.5rem_2rem]  [transform:perspective(1000px)_rotateX(-63deg)] h-[80%] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-#222 to-transparent pointer-events-none " />

      <h1 className="font-departure text-[40px] md:text-[84px] relative z-10 text-center h-[120px] md:h-auto leading-tight">      
          <AnimatedText key={currentText} text={currentText} />
      </h1>
  
      <div className="absolute -bottom-[280px] inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4.5rem_2rem] [transform:perspective(560px)_rotateX(63deg)] pointer-events-none" />
      <div className="absolute w-full bottom-[100px] h-1/2  bg-gradient-to-b from-#222 to-transparent pointer-events-none" />
    </div>
  </div>
  );
}
