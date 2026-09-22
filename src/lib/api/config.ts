export const API_PREFIX = "/api/py";

const LOCAL_API_ORIGIN = "http://127.0.0.1:8000";

function trimTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getServerApiOrigin(): string {
  const explicitOrigin = process.env.API_BASE_URL;
  if (explicitOrigin) {
    return trimTrailingSlash(explicitOrigin);
  }

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (process.env.VERCEL_ENV === "production" && productionHost) {
    return `https://${productionHost}`;
  }

  const deploymentHost = process.env.VERCEL_URL;
  if (deploymentHost) {
    return `https://${deploymentHost}`;
  }

  return LOCAL_API_ORIGIN;
}
