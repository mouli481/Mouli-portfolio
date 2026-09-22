import {
  BadgeCheck,
  Braces,
  Briefcase,
  Home,
  Layers,
  Mail,
  MessageSquare,
  Moon,
  Sun,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NAV_LINKS } from "@/components/layout/nav-links";

export interface CommandNavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  keywords?: string[];
}

const NAV_ICONS: Record<string, LucideIcon> = {
  "/": Home,
  "/about": UserRound,
  "/experience": Briefcase,
  "/projects": Layers,
  "/skills": Braces,
  "/ai-lab": MessageSquare,
  "/resume": BadgeCheck,
  "/contact": Mail,
};

export const NAV_COMMAND_ITEMS: CommandNavItem[] = NAV_LINKS.map((link) => ({
  id: `nav-${link.href}`,
  label: link.label,
  href: link.href,
  icon: NAV_ICONS[link.href] ?? Home,
}));

export const THEME_ICONS = { light: Sun, dark: Moon } as const;
