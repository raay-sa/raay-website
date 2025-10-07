import { httpJson, httpFormData, HttpError } from './http';
import { postRefreshToken } from './auth';

/**
 * Enhanced HTTP client that automatically handles token refresh for authenticated requests.
 * This ensures that all API calls with Authorization headers will automatically attempt
 * to refresh the token if they receive a 401/403 response.
 */

type HttpJsonOptions<B> = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: B;
  query?: Record<string, string | number | boolean | undefined | null>;
  skipAuth?: boolean; // Skip automatic token refresh for this request
};

type HttpFormOptions = {
  method?: "POST" | "PUT" | "PATCH";
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined | null>;
  skipAuth?: boolean; // Skip automatic token refresh for this request
};

/**
 * Get the current token from localStorage
 */
function getCurrentToken(): string | null {
  try {
    const raw = localStorage.getItem('raay-auth');
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed?.token ?? null;
  } catch {
    return null;
  }
}

/**
 * Get the current refresh token from localStorage
 */
function getCurrentRefreshToken(): string | null {
  try {
    const raw = localStorage.getItem('raay-auth');
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed?.refreshToken ?? parsed?.refresh_token ?? null;
  } catch {
    return null;
  }
}

/**
 * Update the stored token in localStorage
 */
function updateStoredToken(newToken: string): void {
  try {
    const raw = localStorage.getItem('raay-auth');
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed) {
      parsed.token = newToken;
      localStorage.setItem('raay-auth', JSON.stringify(parsed));
    }
  } catch {
    // Ignore errors
  }
}

/**
 * Check if a request has an Authorization header
 */
function hasAuthHeader(headers?: Record<string, string>): boolean {
  return !!(headers?.Authorization || headers?.authorization);
}

/**
 * Enhanced httpJson that automatically handles token refresh
 */
export async function httpJsonWithAuth<T, B = unknown>(
  path: string,
  options: HttpJsonOptions<B> = {}
): Promise<T> {
  const { headers, skipAuth, ...restOptions } = options;

  // If this request doesn't have auth headers or auth is explicitly skipped, use regular httpJson
  if (!hasAuthHeader(headers) || skipAuth) {
    return httpJson<T, B>(path, options);
  }

  try {
    // First attempt with current token
    return await httpJson<T, B>(path, options);
  } catch (error) {
    // If we get a 401/403 and this is an authenticated request, try to refresh token
    if (error instanceof HttpError && (error.status === 401 || error.status === 403)) {
      const errorData = error.data as any;
      const errorMessage = errorData?.message?.toLowerCase() || '';
      
      // Check if this is an authentication error
      if (errorMessage.includes('unauthorized') || 
          errorMessage.includes('unauthenticated') ||
          errorMessage.includes('token') ||
          error.status === 401) {
        
        console.log('Auth: Attempting token refresh for failed request');
        
        try {
          const refreshToken = getCurrentRefreshToken();
          if (refreshToken) {
            const refreshResponse = await postRefreshToken(refreshToken);
            const newToken = refreshResponse?.access_token;
            
            if (newToken) {
              console.log('Auth: Token refresh successful, retrying request');
              updateStoredToken(newToken);
              
              // Update the Authorization header with the new token
              const updatedHeaders = {
                ...headers,
                Authorization: `Bearer ${newToken}`,
              };
              
              // Retry the request with the new token
              return await httpJson<T, B>(path, {
                ...restOptions,
                headers: updatedHeaders,
              });
            }
          }
        } catch (refreshError) {
          console.error('Auth: Token refresh failed:', refreshError);
          // If refresh fails, we could optionally clear the session here
          // but we'll let the calling code handle that
        }
      }
    }
    
    // Re-throw the original error if we couldn't handle it
    throw error;
  }
}

/**
 * Enhanced httpFormData that automatically handles token refresh
 */
export async function httpFormDataWithAuth<T>(
  path: string,
  formData: FormData,
  options: HttpFormOptions = {}
): Promise<T> {
  const { headers, skipAuth, ...restOptions } = options;

  // If this request doesn't have auth headers or auth is explicitly skipped, use regular httpFormData
  if (!hasAuthHeader(headers) || skipAuth) {
    return httpFormData<T>(path, formData, options);
  }

  try {
    // First attempt with current token
    return await httpFormData<T>(path, formData, options);
  } catch (error) {
    // If we get a 401/403 and this is an authenticated request, try to refresh token
    if (error instanceof HttpError && (error.status === 401 || error.status === 403)) {
      const errorData = error.data as any;
      const errorMessage = errorData?.message?.toLowerCase() || '';
      
      // Check if this is an authentication error
      if (errorMessage.includes('unauthorized') || 
          errorMessage.includes('unauthenticated') ||
          errorMessage.includes('token') ||
          error.status === 401) {
        
        console.log('Auth: Attempting token refresh for failed form request');
        
        try {
          const refreshToken = getCurrentRefreshToken();
          if (refreshToken) {
            const refreshResponse = await postRefreshToken(refreshToken);
            const newToken = refreshResponse?.access_token;
            
            if (newToken) {
              console.log('Auth: Token refresh successful, retrying form request');
              updateStoredToken(newToken);
              
              // Update the Authorization header with the new token
              const updatedHeaders = {
                ...headers,
                Authorization: `Bearer ${newToken}`,
              };
              
              // Retry the request with the new token
              return await httpFormData<T>(path, formData, {
                ...restOptions,
                headers: updatedHeaders,
              });
            }
          }
        } catch (refreshError) {
          console.error('Auth: Token refresh failed:', refreshError);
        }
      }
    }
    
    // Re-throw the original error if we couldn't handle it
    throw error;
  }
}
