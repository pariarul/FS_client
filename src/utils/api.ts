export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASEURL || 'http://localhost:8000/api';

/**
 * Centered API fetcher for the client site.
 * Handles GET requests and provides typed responses.
 */
export async function fetchFromAPI<T>(endpoint: string): Promise<T | null> {
  try {
    const baseUrl = API_BASE_URL.replace(/\/$/, '');
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    const response = await fetch(`${baseUrl}${path}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`API Error [${path}]: ${response.statusText}`);
      return null;
    }

    const result = await response.json();
    
    if (result.success) {
      return result.data as T;
    } else {
      console.error(`API Logic Error [${path}]: ${result.message || result.error || 'Unknown error'}`);
      return null;
    }
  } catch (error: any) {
    console.error(`Network Error [${endpoint}]:`, error.message);
    return null;
  }
}
