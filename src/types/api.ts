export type ChatEventType =
  "RUN_STARTED" | "TEXT_MESSAGE_CONTENT" | "SOURCES" | "RUN_FINISHED" | "RUN_ERROR";

export interface ChatSource {
  title: string;
  section: string;
  snippet: string;
}

export interface ChatStreamEvent {
  type: ChatEventType;
  runId?: string;
  delta?: string;
  sources?: ChatSource[];
  message?: string;
}

export interface ArchitectureEdge {
  source: string;
  target: string;
  label?: string | null;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  project_slug?: string | null;
}

export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  year: number;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  summary: string;
  achievements: string[];
  tech_stack: string[];
}

export interface FocusArea {
  title: string;
  description: string;
  icon: string;
}

export interface ImpactMetric {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  roles: string[];
  location: string;
  email: string;
  phone: string;
  summary: string;
  bio: string[];
  currently: string;
  years_experience: number;
  education: EducationItem[];
  social_links: SocialLink[];
  focus_areas: FocusArea[];
  values: CoreValue[];
}

export interface ProjectDetail {
  slug: string;
  title: string;
  category: "genai" | "full-stack" | "frontend" | "cloud";
  summary: string;
  company: string;
  period: string;
  role: string;
  tech_stack: string[];
  highlights: string[];
  featured: boolean;
  problem: string;
  solution: string;
  architecture_nodes: ArchitectureNode[];
  architecture_edges: ArchitectureEdge[];
  impact_metrics: ImpactMetric[];
}

export interface ProjectSummary {
  slug: string;
  title: string;
  category: "genai" | "full-stack" | "frontend" | "cloud";
  summary: string;
  company: string;
  period: string;
  role: string;
  tech_stack: string[];
  highlights: string[];
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: "languages" | "ai-ml" | "backend" | "frontend" | "data" | "cloud-devops" | "testing";
  proficiency: number;
  related_skill_ids: string[];
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface Stats {
  years_experience: number;
  projects_shipped: number;
  agents_migrated: number;
  technologies_used: number;
}
