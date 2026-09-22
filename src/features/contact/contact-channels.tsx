import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import type { Profile } from "@/types/api";
import { Reveal } from "@/components/motion/reveal";

export function ContactChannels({ profile }: { profile: Profile }) {
  const channels = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
    },
    { icon: MapPin, label: "Location", value: profile.location, href: null },
  ];

  return (
    <div className="flex flex-col gap-4">
      {channels.map((channel, index) => {
        const content = (
          <>
            <span className="bg-primary/10 text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
              <channel.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="text-muted-foreground text-sm">{channel.label}</span>
              <span className="font-medium break-all">{channel.value}</span>
            </span>
          </>
        );
        return (
          <Reveal key={channel.label} delay={index * 0.08}>
            {channel.href ? (
              <a
                href={channel.href}
                className="focus-ring glass-card hover:border-primary/50 flex items-center gap-4 rounded-3xl p-5 transition-colors"
              >
                {content}
              </a>
            ) : (
              <div className="glass-card flex items-center gap-4 rounded-3xl p-5">{content}</div>
            )}
          </Reveal>
        );
      })}
      <Reveal delay={0.3}>
        <Link
          href="/ai-lab"
          className="focus-ring from-primary/15 to-accent/10 border-primary/30 group flex items-center gap-4 rounded-3xl border bg-gradient-to-br p-5"
        >
          <MessageSquare className="text-primary h-6 w-6 shrink-0" aria-hidden="true" />
          <span className="flex flex-col">
            <span className="font-medium">Prefer a quick answer?</span>
            <span className="text-muted-foreground text-sm">
              Ask my AI assistant about my skills and projects.
            </span>
          </span>
          <ArrowUpRight
            className="ml-auto h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      </Reveal>
    </div>
  );
}
