import { Assistant } from "@/components/assistant";
import type { Metadata } from "next";
import Image from "next/image";
import Files from "public/product-files.png";
import Vault from "public/product-vault.jpg";

export const metadata: Metadata = {
  title: "Vault",
  description:
    "Don’t waste time searching through old emails and random folders. Keep all your contracts, agreements and more safe in one place.",
};

export default function Page() {
  return (
    <div className="container mb-52">
      <div className="mb-40">
        <h1 className="mt-24 font-medium text-center text-[75px] md:text-[170px] mb-2 leading-none text-stroke">
          Your Files
        </h1>

        <h3 className="font-medium text-center text-[75px] md:text-[170px] mb-2 leading-none">
          Vault
        </h3>

        <div className="flex items-center flex-col text-center relative">
          <p className="text-lg mt-4 max-w-[600px]">
            Don’t waste time searching through old emails and random folders.
            Keep all your contracts, agreements and more safe in one place.
          </p>
        </div>
      </div>

      <Image src={Vault} quality={100} alt="Vault" />

      <div className="flex items-center flex-col text-center relative mt-28">
        <div className="max-w-[600px]">
          <h4 className="font-medium text-xl md:text-2xl mb-4">
            All your files in one place
          </h4>
          <p className="text-[#878787] text-sm">
            Gather all your business files you have laying around and have them
            in one place. Upload quickly and be able to share them with whomever
            you want.
          </p>
        </div>

        <Image
          src={Files}
          quality={100}
          alt="Files"
          className="mt-10 max-w-[834px] w-full"
        />

        <div className="mt-32 max-w-[550px]">
          <h4 className="font-medium text-xl md:text-2xl mb-4">
            Use assistant to search
          </h4>
          <p className="text-[#878787] text-sm mb-10">
            Use the assistant to search for your files or even within your
            files. Say you want to find that old contract but can’t remember
            which client it was for, just search for details around it and the
            assistant will find it for you.
          </p>
        </div>

        <div className="text-left scale-[0.45] md:scale-100 -mt-20 md:mt-0">
          <Assistant />
        </div>
      </div>
    </div>
  );
}
