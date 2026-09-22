"use client";

import { Command } from "cmdk";
import { Copy, Download, Moon, Search, Sparkles, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useChatWidget } from "@/features/chat/chat-widget-context";
import { NAV_COMMAND_ITEMS } from "@/features/command-menu/command-items";
import { useCommandMenu } from "@/features/command-menu/command-menu-context";

const CONTACT_EMAIL = "mouli.v598@gmail.com";
const ITEM_CLASS =
  "text-foreground data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm scroll-mt-2";
const GROUP_CLASS = "px-2 pb-2";

export function CommandMenu() {
  const { isOpen, close } = useCommandMenu();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { openChat } = useChatWidget();
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setCopied(false);
    }
  }, [isOpen]);

  const runAndClose = (action: () => void) => {
    action();
    close();
  };

  const trimmedSearch = search.trim();
  const isDark = resolvedTheme === "dark";

  return (
    <Command.Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? undefined : close())}
      label="Command menu"
      shouldFilter
      loop
      overlayClassName="fixed inset-0 z-[70] bg-background/70 backdrop-blur-sm print:hidden"
      contentClassName="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh] outline-none print:hidden"
      className="bg-surface/95 border-card-border relative w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl"
    >
      <div className="border-border flex items-center gap-3 border-b px-4">
        <Search className="text-muted-foreground h-4 w-4 shrink-0" aria-hidden="true" />
        <Command.Input
          autoFocus
          value={search}
          onValueChange={setSearch}
          placeholder="Search pages, ask the AI, or run a command…"
          className="placeholder:text-muted-foreground/70 h-12 flex-1 bg-transparent text-sm outline-none"
        />
        <kbd className="border-border text-muted-foreground hidden rounded-md border px-1.5 py-0.5 text-[10px] sm:inline-block">
          Esc
        </kbd>
      </div>

      <Command.List className="max-h-[60vh] overflow-y-auto p-2">
        <Command.Empty className="text-muted-foreground px-4 py-8 text-center text-sm">
          No matches. Press Enter to ask the AI instead.
        </Command.Empty>

        {trimmedSearch ? (
          <Command.Group heading="Ask the AI" className={GROUP_CLASS}>
            <Command.Item
              value={`ask-ai-${trimmedSearch}`}
              onSelect={() => runAndClose(() => openChat({ message: trimmedSearch }))}
              className={ITEM_CLASS}
            >
              <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">
                Ask: <span className="font-medium">&ldquo;{trimmedSearch}&rdquo;</span>
              </span>
            </Command.Item>
          </Command.Group>
        ) : null}

        <Command.Group heading="Pages" className={GROUP_CLASS}>
          {NAV_COMMAND_ITEMS.map((item) => (
            <Command.Item
              key={item.id}
              value={item.label}
              onSelect={() => runAndClose(() => router.push(item.href))}
              className={ITEM_CLASS}
            >
              <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {item.label}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Actions" className={GROUP_CLASS}>
          <Command.Item
            value="toggle theme dark light"
            onSelect={() => runAndClose(() => setTheme(isDark ? "light" : "dark"))}
            className={ITEM_CLASS}
          >
            {isDark ? (
              <Sun className="h-4 w-4 shrink-0" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4 shrink-0" aria-hidden="true" />
            )}
            Switch to {isDark ? "light" : "dark"} mode
          </Command.Item>
          <Command.Item
            value="download resume pdf"
            onSelect={() =>
              runAndClose(() => {
                const link = document.createElement("a");
                link.href = "/resume.pdf";
                link.download = "Mouli-V-Resume.pdf";
                link.click();
              })
            }
            className={ITEM_CLASS}
          >
            <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
            Download resume PDF
          </Command.Item>
          <Command.Item
            value="copy email address"
            onSelect={() => {
              void navigator.clipboard.writeText(CONTACT_EMAIL);
              setCopied(true);
            }}
            className={ITEM_CLASS}
          >
            <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
            {copied ? "Copied!" : `Copy email (${CONTACT_EMAIL})`}
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
