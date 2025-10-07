import { useEffect, useRef } from 'react';
import { useAuthStore } from '../authStore';
import { postRefreshToken } from '../api/auth';

/**
 * Hook to initialize authentication state and handle automatic token refresh
 * on app startup (hard refresh). This ensures users stay logged in even after
 * browser refresh if they have a valid refresh token.
 */
export function useAuthInit() {
  const { hydrate, setSession, logout } = useAuthStore();
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only run once on mount
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initializeAuth = async () => {
      try {
        // First, hydrate the store from localStorage
        hydrate();

        // Check if we have stored auth data
        const raw = localStorage.getItem('raay-auth');
        if (!raw) return;

        const parsed = JSON.parse(raw);
        const { token, refreshToken, user } = parsed;

        // If we have a token, we're already authenticated
        if (token) {
          console.log('Auth: Found existing token, user is authenticated');
          return;
        }

        // If we don't have a token but have a refresh token, try to refresh
        if (refreshToken && !token) {
          console.log('Auth: No token found, attempting to refresh with refresh token');
          
          try {
            const refreshResponse = await postRefreshToken(refreshToken);
            const newToken = refreshResponse?.access_token;

            if (newToken) {
              console.log('Auth: Token refresh successful');
              // Update the session with the new token
              setSession(newToken, refreshToken, user);
            } else {
              console.log('Auth: Token refresh failed - no new token received');
              // Clear invalid session
              logout();
            }
          } catch (refreshError) {
            console.error('Auth: Token refresh failed:', refreshError);
            // Clear invalid session
            logout();
          }
        } else {
          console.log('Auth: No token or refresh token found');
        }
      } catch (error) {
        console.error('Auth: Initialization error:', error);
        // Clear any corrupted session data
        logout();
      }
    };

    initializeAuth();
  }, [hydrate, setSession, logout]);
}
