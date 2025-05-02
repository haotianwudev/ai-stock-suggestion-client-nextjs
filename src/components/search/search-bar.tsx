"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_STOCKS } from "@/lib/graphql/queries";
import { SearchResult } from "@/lib/graphql/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { SearchIcon } from "@/components/icons";

export function SearchBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  
  const [searchStocks, { loading, data }] = useLazyQuery(SEARCH_STOCKS, {
    variables: { query: debouncedSearchQuery },
  });
  
  const searchResults = data?.searchStocks || [];

  useEffect(() => {
    if (!debouncedSearchQuery) return;
    searchStocks();
  }, [debouncedSearchQuery, searchStocks]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelectStock = (ticker: string) => {
    setOpen(false);
    router.push(`/stock/${ticker}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search stocks...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search stocks..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Stocks">
            {searchResults.map((stock: SearchResult) => (
              <CommandItem
                key={stock.ticker}
                value={stock.ticker}
                onSelect={() => handleSelectStock(stock.ticker)}
              >
                <div className="flex items-center">
                  <span className="mr-2 font-bold">{stock.ticker}</span>
                  <span className="text-sm text-muted-foreground">{stock.name}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
} 