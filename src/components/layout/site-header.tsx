"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/components/layout/nav-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useCommandMenu } from "@/features/command-menu/command-menu-context";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { open: openCommandMenu } = useCommandMenu();

  return (
    <header className="glass-card sticky top-0 z-40 border-x-0 border-t-0 print:hidden">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="focus-ring rounded-md text-lg font-semibold tracking-tight"
          onClick={() => setIsMenuOpen(false)}
        >
          Mouli<span className="text-primary">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "focus-ring relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    {isActive ? (
                      <span className="bg-primary absolute right-3 -bottom-0.5 left-3 h-0.5 rounded-full" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandMenu}
            aria-label="Open command menu"
            className="focus-ring border-border text-muted-foreground hover:border-primary/50 hover:text-foreground hidden items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors sm:flex"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Search</span>
            <kbd className="border-border bg-foreground/5 rounded border px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </kbd>
          </button>
          <ThemeToggle className="hidden sm:flex" />
          <button
            type="button"
            className="focus-ring border-border flex h-9 w-9 items-center justify-center rounded-full border md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav id="mobile-nav" aria-label="Mobile" className="glass-card border-t md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "focus-ring block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-foreground bg-white/5"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="flex items-center gap-2 px-3 pt-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  openCommandMenu();
                }}
                className="focus-ring border-border text-muted-foreground hover:text-foreground flex h-9 flex-1 items-center justify-center gap-2 rounded-full border text-sm transition-colors"
              >
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
                Search
              </button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
