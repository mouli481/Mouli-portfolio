import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { NAV_LINKS } from "@/components/layout/nav-links";

const CONTACT_EMAIL = "mouli.v598@gmail.com";
const CONTACT_PHONE = "+91 8639598444";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border mt-24 border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="text-lg font-semibold tracking-tight">
            Mouli<span className="text-primary">.</span>
          </p>
          <p className="text-muted-foreground mt-2 text-sm">
            Python Full Stack Developer building production Generative AI and RAG systems.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="focus-ring text-muted-foreground hover:text-foreground flex w-fit items-center gap-2 rounded-md transition-colors"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
            <a
              href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
              className="focus-ring text-muted-foreground hover:text-foreground flex w-fit items-center gap-2 rounded-md transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {CONTACT_PHONE}
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="focus-ring text-muted-foreground hover:text-foreground rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-border border-t">
        <p className="text-muted-foreground mx-auto max-w-6xl px-4 py-6 text-xs sm:px-6">
          © {year} Mouli V. Built with Next.js, FastAPI and a lot of coffee.
        </p>
      </div>
    </footer>
  );
}
