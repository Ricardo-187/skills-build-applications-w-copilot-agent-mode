type ApiPayload = {
  results?: unknown[];
  items?: unknown[];
  data?: unknown[];
};

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://127.0.0.1:8000/api';

export const ACTIVITIES_API = `${API_BASE_URL}/activities/`;
export const LEADERBOARD_API = `${API_BASE_URL}/leaderboard/`;
export const TEAMS_API = `${API_BASE_URL}/teams/`;
export const USERS_API = `${API_BASE_URL}/users/`;
export const WORKOUTS_API = `${API_BASE_URL}/workouts/`;

export function getApiBaseUrl(): string {
  return API_BASE_URL;
}

export function getApiUrl(resource: string): string {
  return `${API_BASE_URL}/${resource}/`;
}

function normalizeCollection(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  const candidate = payload as ApiPayload;

  if (Array.isArray(candidate.results)) return candidate.results;
  if (Array.isArray(candidate.items)) return candidate.items;
  if (Array.isArray(candidate.data)) return candidate.data;

  return [];
}

export async function fetchJson<T = unknown>(url: string): Promise<T[]> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load data from ${url}`);
  }

  return normalizeCollection(await response.json()) as T[];
}

export async function fetchCollection(resource: string) {
  return fetchJson(getApiUrl(resource));
}
