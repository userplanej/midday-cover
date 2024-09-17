"use client";

import { motion } from "framer-motion";
import YardImage from 'public/yard.jpg';
import PatioImage from 'public/patio.jpg';
import SideImage from 'public/side.jpg';

import Image from "next/image";
export const CameraView = () => {
  return (
    <div className="md:max-w-[452px] max-w-[calc(100dvw-80px)] w-full pb-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <motion.div
            className="relative h-58 w-72 dark:bg-zinc-800 bg-zinc-100 rounded-lg p-2 flex flex-col justify-end"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Image
             src={YardImage}
             alt="Yard"
             fill
             sizes="(max-width: 768px) 288px, 288px"
             className="object-cover"
             priority
           />
            <div className="text-xs px-1 py-0.5 bg-white text-zinc-900 w-fit z-10 rounded-md">
              Front Yard
            </div>
          </motion.div>

          <div className="flex flex-col gap-2">
            <motion.div
              className=" relative h-28 w-52 dark:bg-zinc-800 bg-zinc-100 rounded-lg flex flex-col justify-end p-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src={PatioImage}
                alt="Patio"
                fill
                sizes="(max-width: 768px) 208px, 208px"
                className="object-cover"
              />
              <div className="text-xs px-1 py-0.5 bg-white text-zinc-900 w-fit z-10 rounded-md">
                Patio
              </div>
            </motion.div>
            <motion.div
              className=" relative h-28 w-52 dark:bg-zinc-800 bg-zinc-100 rounded-lg flex flex-col justify-end p-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Image
                src={SideImage}
                alt="Side"
                fill
                sizes="(max-width: 768px) 208px, 208px"
                className="object-cover"
              />
              <div className="text-xs px-1 py-0.5 bg-white text-zinc-900 w-fit z-10 rounded-md">
                Side
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};
