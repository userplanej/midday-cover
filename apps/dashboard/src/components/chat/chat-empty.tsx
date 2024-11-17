import { Icons } from "@midday/ui/icons";
import Image from "next/image";
import strawberry from 'public/strawberry.jpg';
import { TextEffect } from "../type-effect";


type Props = {
  firstName: string;
};

export function ChatEmpty({ firstName }: Props) {
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const fancyVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
        },
      },
    },
    item: {
      hidden: () => ({
        opacity: 0,
        y: Math.random() * 100 - 50,
        rotate: Math.random() * 90 - 45,
        scale: 0.3,
        color: getRandomColor(),
      }),
      visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        color: getRandomColor(),
        transition: {
          type: 'spring',
          damping: 12,
          stiffness: 200,
        },
      },
    },
  };
  return (
    <div className="w-full  mt-1  md:m-1 flex flex-col items-start justify-items-start text-center">
        
      <span className=" mt-6">
        안녕하세요 {firstName}, 무엇을  
        도와드릴까요?
      </span>
      <TextEffect per='word' variants={fancyVariants}>
      Animate your ideas with motion-primitives
    </TextEffect>
    </div>
  );
}
