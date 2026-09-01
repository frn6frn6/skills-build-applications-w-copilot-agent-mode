// octofit-tracker/backend/src/servers.ts
// Exports server configuration used by the backend and by clients that need
// a codespace-aware API base URL.

export const PORT: number = process.env.PORT ? Number(process.env.PORT) : 8000;

// CODESPACE_NAME is provided automatically inside GitHub Codespaces. When set,
// we build the public Codespaces URL that forwards to the app running on port 8000:
//   https://$CODESPACE_NAME-8000.app.github.dev
// When not set, we fall back to localhost (and allow overrides via API_HOST/API_PROTOCOL).
export const CODESPACE_NAME: string | undefined = process.env.CODESPACE_NAME;

export function buildApiBaseUrl(): string {
  if (CODESPACE_NAME && CODESPACE_NAME.length > 0) {
    // Use the Codespaces public forwarding hostname for port 8000
    return `https://${CODESPACE_NAME}-8000.app.github.dev`;
  }

  // Default to localhost:8000; allow overrides via API_HOST and API_PROTOCOL env vars
  const protocol = process.env.API_PROTOCOL || 'http';
  const host = process.env.API_HOST || `localhost:${PORT}`;
  return `${protocol}://${host}`;
}

export const API_BASE_URL = buildApiBaseUrl();
