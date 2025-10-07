import { httpJsonWithAuth, httpFormDataWithAuth } from './httpWithAuth';

/**
 * Utility functions for making authenticated API requests.
 * These functions automatically handle token refresh when needed.
 */

/**
 * Make an authenticated GET request
 */
export async function authenticatedGet<T>(
  path: string,
  token: string,
  query?: Record<string, string | number | boolean | undefined | null>
): Promise<T> {
  return httpJsonWithAuth<T>(path, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    query,
  });
}

/**
 * Make an authenticated POST request
 */
export async function authenticatedPost<T, B = unknown>(
  path: string,
  token: string,
  body?: B,
  query?: Record<string, string | number | boolean | undefined | null>
): Promise<T> {
  return httpJsonWithAuth<T, B>(path, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
    query,
  });
}

/**
 * Make an authenticated PUT request
 */
export async function authenticatedPut<T, B = unknown>(
  path: string,
  token: string,
  body?: B,
  query?: Record<string, string | number | boolean | undefined | null>
): Promise<T> {
  return httpJsonWithAuth<T, B>(path, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
    query,
  });
}

/**
 * Make an authenticated PATCH request
 */
export async function authenticatedPatch<T, B = unknown>(
  path: string,
  token: string,
  body?: B,
  query?: Record<string, string | number | boolean | undefined | null>
): Promise<T> {
  return httpJsonWithAuth<T, B>(path, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
    query,
  });
}

/**
 * Make an authenticated DELETE request
 */
export async function authenticatedDelete<T>(
  path: string,
  token: string,
  query?: Record<string, string | number | boolean | undefined | null>
): Promise<T> {
  return httpJsonWithAuth<T>(path, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    query,
  });
}

/**
 * Make an authenticated form data request
 */
export async function authenticatedFormData<T>(
  path: string,
  token: string,
  formData: FormData,
  method: 'POST' | 'PUT' | 'PATCH' = 'POST',
  query?: Record<string, string | number | boolean | undefined | null>
): Promise<T> {
  return httpFormDataWithAuth<T>(path, formData, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    query,
  });
}
