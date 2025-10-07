# Authentication System

This directory contains the authentication system for the Raay frontend application.

## Overview

The authentication system now automatically handles token refresh in two scenarios:

1. **On App Startup (Hard Refresh)**: When the browser is refreshed, the app automatically checks for a stored refresh token and attempts to get a new access token.
2. **During API Requests**: All authenticated API requests automatically attempt to refresh the token if they receive a 401/403 response.

## Files

### `useAuthInit.ts`
- Hook that runs on app startup
- Automatically attempts to refresh tokens if only a refresh token is available
- Hydrates the auth store from localStorage

### `session.ts`
- Utility functions for managing stored authentication data
- Handles localStorage operations for auth tokens

### `authStore.ts`
- Zustand store for managing authentication state
- Provides `hydrate()` method to load from localStorage
- Manages token, refresh token, user data, and authentication status

## API Integration

### `httpWithAuth.ts`
- Enhanced HTTP client that automatically handles token refresh
- Wraps the base HTTP functions with automatic retry logic
- Detects 401/403 responses and attempts token refresh

### `authUtils.ts`
- Utility functions for making authenticated API requests
- Provides convenient methods for GET, POST, PUT, PATCH, DELETE, and FormData requests
- All functions automatically handle token refresh

## Usage

### In Components
```typescript
import { useAuthStore } from '@/lib/authStore';
import { authenticatedGet } from '@/lib/api/authUtils';

function MyComponent() {
  const { token } = useAuthStore();
  
  const fetchData = async () => {
    if (token) {
      const data = await authenticatedGet('/api/data', token);
      // Token refresh is handled automatically
    }
  };
}
```

### Making Authenticated Requests
```typescript
import { authenticatedPost } from '@/lib/api/authUtils';

// This will automatically handle token refresh if needed
const result = await authenticatedPost('/api/endpoint', token, requestBody);
```

## How It Works

1. **App Startup**: `useAuthInit` hook runs and checks for stored tokens
2. **Token Refresh**: If only refresh token exists, it attempts to get a new access token
3. **API Requests**: All authenticated requests use the enhanced HTTP client
4. **Automatic Retry**: If a request fails with 401/403, the system automatically:
   - Attempts to refresh the token
   - Updates localStorage with the new token
   - Retries the original request with the new token

## Benefits

- Users stay logged in after browser refresh
- Seamless token refresh without user intervention
- Reduced authentication errors
- Better user experience
- Centralized authentication logic
