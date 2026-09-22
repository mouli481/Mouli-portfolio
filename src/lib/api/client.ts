import type { ContactRequest, ContactResponse, ProjectSummary } from "@/types/api";
import type { ProjectCategoryFilter } from "@/types/project";
import { API_PREFIX } from "@/lib/api/config";
import { ApiError, readErrorMessage } from "@/lib/api/errors";

export async function fetchProjects(category: ProjectCategoryFilter): Promise<ProjectSummary[]> {
  const query = category === "all" ? "" : `?category=${encodeURIComponent(category)}`;
  const response = await fetch(`${API_PREFIX}/projects${query}`);
  if (!response.ok) {
    throw new ApiError(response.status, "Could not load projects.");
  }
  return (await response.json()) as ProjectSummary[];
}

export async function submitContactForm(payload: ContactRequest): Promise<ContactResponse> {
  const response = await fetch(`${API_PREFIX}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const message = await readErrorMessage(response, "Something went wrong. Please try again.");
    throw new ApiError(response.status, message);
  }
  return (await response.json()) as ContactResponse;
}
