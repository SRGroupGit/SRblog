import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Card } from "@/components/ui/card";

interface GlobalSearchProps {
  searchOpen: boolean;
  setSearchOpen: (searchOpen: boolean) => void;
}

export default function GlobalSearch({
  searchOpen,
  setSearchOpen,
}: GlobalSearchProps) {
  return (
    <>
      {searchOpen && (
        <div className=" w-full h-dvh fixed z-[999]  flex items-center justify-center top-0 left-0">
          <div
            onClick={() => setSearchOpen(!searchOpen)}
            className=" absolute w-full h-full top-0 left-0 bg-white/80 dark:bg-black/80 backdrop-blur-md"
          ></div>
          <Card className=" flex w-full flex-col  px-3 py-3 gap-3  md:max-w-md relative z-10">
            <div className=" w-full flex justify-between items-center">
              <span className=" text-2xl  font-semibold ">Search Articles</span>
              <Button
                onClick={() => setSearchOpen(!searchOpen)}
                className=" outline-none aspect-square"
                variant="ghost"
                size="icon"
              >
                <Cross1Icon className="h-[1.2rem] w-[1.2rem]  " />
                <span className="sr-only">Toggle Search Box</span>
              </Button>
            </div>

            <div className=" w-full flex  gap-1">
              <Input type="text" className=" " placeholder="Search" />
              <Button
                onClick={() => setSearchOpen(!searchOpen)}
                className=" outline-none aspect-square"
                variant="outline"
                size="icon"
              >
                <MagnifyingGlassIcon className="h-[1.2rem] w-[1.2rem]  " />

                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
