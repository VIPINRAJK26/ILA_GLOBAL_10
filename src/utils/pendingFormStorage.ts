/**
 * Utilities for storing and restoring pending form data and auth redirect targets.
 * Used when unauthenticated users attempt to submit forms (e.g. Visa application, enquiry).
 */

const AUTH_REDIRECT_KEY = 'ila_auth_redirect_url';
const PENDING_FORM_PREFIX = 'ila_pending_form_';

export interface PendingFormData<T = any> {
  formKey: string;
  data: T;
  returnUrl: string;
  timestamp: number;
}

/**
 * Save form state and mark redirect URL for after login/register
 */
export function savePendingForm<T>(formKey: string, data: T, returnUrl?: string): void {
  const url = returnUrl || (window.location.pathname + window.location.search);
  const payload: PendingFormData<T> = {
    formKey,
    data,
    returnUrl: url,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(PENDING_FORM_PREFIX + formKey, JSON.stringify(payload));
    localStorage.setItem(AUTH_REDIRECT_KEY, url);
  } catch (e) {
    console.error('Failed to save pending form data to localStorage:', e);
  }
}

/**
 * Retrieve saved pending form data
 */
export function getPendingForm<T>(formKey: string): PendingFormData<T> | null {
  try {
    const raw = localStorage.getItem(PENDING_FORM_PREFIX + formKey);
    if (!raw) return null;
    return JSON.parse(raw) as PendingFormData<T>;
  } catch {
    return null;
  }
}

/**
 * Clear a specific pending form from localStorage
 */
export function clearPendingForm(formKey: string): void {
  try {
    localStorage.removeItem(PENDING_FORM_PREFIX + formKey);
  } catch {
    // Ignore
  }
}

/**
 * Get and clear the stored auth redirect target.
 * Defaults to '/' (Home page) if none was stored.
 */
export function consumeAuthRedirect(defaultUrl: string = '/'): string {
  try {
    const target = localStorage.getItem(AUTH_REDIRECT_KEY);
    if (target) {
      localStorage.removeItem(AUTH_REDIRECT_KEY);
      return target;
    }
  } catch {
    // Ignore
  }
  return defaultUrl;
}

/**
 * Peek at redirect URL without clearing
 */
export function getAuthRedirect(): string | null {
  try {
    return localStorage.getItem(AUTH_REDIRECT_KEY);
  } catch {
    return null;
  }
}

/**
 * Set an explicit auth redirect target
 */
export function setAuthRedirect(url: string): void {
  try {
    localStorage.setItem(AUTH_REDIRECT_KEY, url);
  } catch {
    // Ignore
  }
}
