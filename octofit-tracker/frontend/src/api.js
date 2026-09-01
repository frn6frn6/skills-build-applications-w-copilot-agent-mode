/**
 * API client utility
 * 
 * Provides a base URL configured via Vite environment variables.
 * Set VITE_CODESPACE_NAME in .env.local to enable Codespaces forwarding.
 * 
 * Example .env.local:
 *   VITE_CODESPACE_NAME=your-codespace-name
 */

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName && codespaceName.trim() !== '') {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }
  
  // Fallback to localhost for local development
  const protocol = import.meta.env.VITE_API_PROTOCOL || 'http';
  const host = import.meta.env.VITE_API_HOST || 'localhost:8000';
  return `${protocol}://${host}/api`;
}

const API_BASE_URL = getApiBaseUrl();

/**
 * Fetch data from an API endpoint
 * @param {string} endpoint - The endpoint path (e.g., 'users', 'workouts')
 * @returns {Promise<Array>} Array of items from the API
 */
export async function fetchFromApi(endpoint) {
  try {
    const url = `${API_BASE_URL}/${endpoint}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle both paginated responses and direct array responses
    if (Array.isArray(data)) {
      return data;
    }
    
    if (data.data && Array.isArray(data.data)) {
      return data.data;
    }
    
    if (data.results && Array.isArray(data.results)) {
      return data.results;
    }
    
    // Single object response, wrap in array
    return [data];
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

export { API_BASE_URL };
