"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SearchBar } from "@/components/search/search-bar";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-14 sm:h-16 items-center px-4 sm:px-6">
        <div className="flex items-center flex-1 min-w-0">
          <Link href="/" className="flex items-center space-x-2 min-w-0">
            <div className="relative h-6 w-6 sm:h-8 sm:w-8 rounded-full overflow-hidden border border-purple-300 shadow-sm flex-shrink-0">
              <Image 
                src="/images/agents/SOPHIE.png"
                alt="SOPHIE" 
                width={32} 
                height={32}
                className="object-cover"
              />
            </div>
            <span className="font-bold text-sm sm:text-lg lg:text-xl truncate">
              SOPHIE's Daddy Quant Blog
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          <div className="w-32 sm:w-40 md:w-48 lg:w-auto lg:flex-1 lg:max-w-md">
            <SearchBar />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
} 