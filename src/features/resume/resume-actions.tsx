"use client";

import { Download, Printer } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";

export function ResumeActions() {
  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <ButtonLink
        href="/resume.pdf"
        download="Mouli-V-Resume.pdf"
        prefetch={false}
        data-cursor="Download"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Download PDF
      </ButtonLink>
      <Button variant="outline" onClick={() => window.print()}>
        <Printer className="h-4 w-4" aria-hidden="true" />
        Print
      </Button>
    </div>
  );
}
