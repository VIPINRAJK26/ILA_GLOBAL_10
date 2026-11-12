const ACCESS_TOKEN_KEY = 'ila_auth_access_token';
const REFRESH_TOKEN_KEY = 'ila_auth_refresh_token';

export const storeAuthTokens = (tokens: { access?: string; refresh?: string }): void => {
  if (tokens.access) localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
  if (tokens.refresh) localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
};

export const getAccessToken = (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY);

export const clearAuthTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const notifyAuthenticationExpired = (): void => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ila:auth-expired'));
  }
};
