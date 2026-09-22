import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import type { ExperienceItem, Profile, ProjectSummary, Skill } from "@/types/api";
import { formatDateRange } from "@/lib/format";
import { SKILL_CATEGORY_LABELS, SKILL_CATEGORY_ORDER } from "@/features/skills/categories";
import { ResumeSection } from "@/features/resume/resume-section";

interface ResumeDocumentProps {
  profile: Profile;
  experience: ExperienceItem[];
  projects: ProjectSummary[];
  skills: Skill[];
}

export function ResumeDocument({ profile, experience, projects, skills }: ResumeDocumentProps) {
  const contacts = [
    { icon: Mail, value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: MapPin, value: profile.location, href: null },
  ];
  const skillGroups = SKILL_CATEGORY_ORDER.map((category) => ({
    label: SKILL_CATEGORY_LABELS[category],
    names: skills.filter((skill) => skill.category === category).map((skill) => skill.name),
  })).filter((group) => group.names.length > 0);

  return (
    <article className="glass-card resume-document mx-auto flex max-w-4xl flex-col gap-10 rounded-[2rem] p-6 sm:p-12 print:gap-7 print:rounded-none print:border-0 print:px-2 print:py-0 print:shadow-none">
      <header className="border-border flex flex-col gap-4 border-b pb-8">
        <h2 className="text-4xl font-semibold tracking-tight">{profile.name}</h2>
        <p className="text-primary text-lg font-medium">{profile.title}</p>
        <ul className="text-muted-foreground flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {contacts.map((contact) => (
            <li key={contact.value} className="flex items-center gap-2">
              <contact.icon className="h-4 w-4" aria-hidden="true" />
              {contact.href ? (
                <a href={contact.href} className="focus-ring hover:text-foreground rounded-sm">
                  {contact.value}
                </a>
              ) : (
                contact.value
              )}
            </li>
          ))}
        </ul>
      </header>

      <ResumeSection title="Summary">
        <p className="text-foreground/85 leading-relaxed">{profile.summary}</p>
      </ResumeSection>

      <ResumeSection title="Experience">
        <ol className="flex flex-col gap-7">
          {experience.map((item) => (
            <li key={item.id} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-lg font-semibold">
                  {item.role} · <span className="text-primary">{item.company}</span>
                </h4>
                <span className="text-muted-foreground text-sm">
                  {formatDateRange(item.start_date, item.end_date)}
                </span>
              </div>
              <p className="text-muted-foreground mt-1 text-sm">{item.location}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
                {item.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </ResumeSection>

      <ResumeSection title="Selected projects">
        <ul className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug} className="break-inside-avoid">
              <p className="font-semibold">{project.title}</p>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {project.summary}
              </p>
            </li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title="Skills">
        <dl className="grid gap-3 text-sm sm:grid-cols-[160px_1fr]">
          {skillGroups.map((group) => (
            <div key={group.label} className="contents">
              <dt className="font-semibold">{group.label}</dt>
              <dd className="text-muted-foreground">{group.names.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </ResumeSection>

      <ResumeSection title="Education">
        {profile.education.map((item) => (
          <div key={item.institution} className="flex items-start gap-3">
            <GraduationCap className="text-primary mt-0.5 h-5 w-5" aria-hidden="true" />
            <div>
              <p className="font-semibold">
                {item.degree}, {item.field}
              </p>
              <p className="text-muted-foreground text-sm">
                {item.institution} · {item.year}
              </p>
            </div>
          </div>
        ))}
      </ResumeSection>
    </article>
  );
}
