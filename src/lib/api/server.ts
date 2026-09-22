import { connection } from "next/server";
import type {
  ExperienceItem,
  Profile,
  ProjectDetail,
  ProjectSummary,
  Skill,
  Stats,
} from "@/types/api";
import { API_PREFIX, getServerApiOrigin } from "@/lib/api/config";
import { ApiError } from "@/lib/api/errors";

const REVALIDATE_SECONDS = 300;

async function fetchFromApi(path: string): Promise<Response> {
  await connection();
  return fetch(`${getServerApiOrigin()}${API_PREFIX}${path}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetchFromApi(path);
  if (!response.ok) {
    throw new ApiError(response.status, `Request to ${path} failed with ${response.status}`);
  }
  return (await response.json()) as T;
}

export function getProfile(): Promise<Profile> {
  return getJson<Profile>("/profile");
}

export function getExperience(): Promise<ExperienceItem[]> {
  return getJson<ExperienceItem[]>("/experience");
}

export function getProjects(): Promise<ProjectSummary[]> {
  return getJson<ProjectSummary[]>("/projects");
}

export async function getProject(slug: string): Promise<ProjectDetail | null> {
  const response = await fetchFromApi(`/projects/${encodeURIComponent(slug)}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new ApiError(response.status, `Request for project ${slug} failed`);
  }
  return (await response.json()) as ProjectDetail;
}

export function getSkills(): Promise<Skill[]> {
  return getJson<Skill[]>("/skills");
}

export function getStats(): Promise<Stats> {
  return getJson<Stats>("/stats");
}
