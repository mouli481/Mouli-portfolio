import {
  AppWindow,
  Bot,
  Braces,
  Cloud,
  Database,
  Mail,
  Phone,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  bot: Bot,
  braces: Braces,
  cloud: Cloud,
  database: Database,
  layout: AppWindow,
  mail: Mail,
  phone: Phone,
  rocket: Rocket,
  server: Server,
  shield: ShieldCheck,
  sparkles: Sparkles,
  target: Target,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Component = ICONS[name] ?? Sparkles;
  return <Component aria-hidden="true" {...props} />;
}
