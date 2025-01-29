"use client";

import * as React from "react";
import { MoonIcon, SunIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import GlobalSearch from "./GlobalSearch";
import Link from "next/link";

export function Navbar() {
  const { setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme } = useTheme();
  const [sansFont, setSansFont] = useState(true);

  useEffect(() => {
    if (sansFont === false) {
      setSansFont(false);
      document.documentElement.classList.add("font-serif");
      document.documentElement.classList.remove("font-sans");
    }
    if (sansFont === true) {
      setSansFont(true);
      document.documentElement.classList.remove("font-serif");
      document.documentElement.classList.add("font-sans");
    }
  }, [sansFont]);

  return (
    <>
      <GlobalSearch searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      <nav className=" w-full h-20 flex z-[99]  dark:bg-zinc-900/0 fixed top-0 left-0 bg-zinc-200/0 backdrop-blur-lg justify-between items-center px-4">
        <Link className="  h-full aspect-square " href="/">
          <div className="  h-full aspect-square py-2 ">
            <Logo />
          </div>
        </Link>
        <div className=" flex items-center gap-2">
          {/* <Button
            onClick={() => setSearchOpen(!searchOpen)}
            className=" outline-none aspect-square"
            variant="default"
            size="icon"
          >
            <MagnifyingGlassIcon className="h-[1.2rem] w-[1.2rem]  " />

            <span className="sr-only">Toggle Search</span>
          </Button> */}
          <Button
            onClick={() => setSansFont(!sansFont)}
            className=" outline-none aspect-square"
            variant="default"
            size="icon"
          >
            <span className=" text-sm">Aa</span>

            <span className="sr-only">Toggle Font</span>
          </Button>
          <Button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className=" outline-none aspect-square"
            variant="default"
            size="icon"
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </nav>
    </>
  );
}
