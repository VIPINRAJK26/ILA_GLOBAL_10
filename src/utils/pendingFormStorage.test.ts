import { describe, it, expect, beforeEach } from 'vitest';
import {
  savePendingForm,
  getPendingForm,
  clearPendingForm,
  consumeAuthRedirect,
  getAuthRedirect,
  setAuthRedirect,
} from './pendingFormStorage';

describe('pendingFormStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and retrieves pending form data', () => {
    const mockData = { fullName: 'John Doe', email: 'john@example.com' };
    savePendingForm('test_form', mockData, '/visa-services');

    const result = getPendingForm<typeof mockData>('test_form');
    expect(result).not.toBeNull();
    expect(result?.formKey).toBe('test_form');
    expect(result?.data).toEqual(mockData);
    expect(result?.returnUrl).toBe('/visa-services');
    expect(result?.timestamp).toBeGreaterThan(0);
  });

  it('returns null when retrieving a non-existent form', () => {
    const result = getPendingForm('non_existent');
    expect(result).toBeNull();
  });

  it('clears specific pending form from localStorage', () => {
    savePendingForm('form_to_clear', { test: true });
    expect(getPendingForm('form_to_clear')).not.toBeNull();

    clearPendingForm('form_to_clear');
    expect(getPendingForm('form_to_clear')).toBeNull();
  });

  it('stores and consumes auth redirect url', () => {
    setAuthRedirect('/dashboard/courses');
    expect(getAuthRedirect()).toBe('/dashboard/courses');

    const consumed = consumeAuthRedirect('/default');
    expect(consumed).toBe('/dashboard/courses');

    // After consuming, next call returns default
    const nextConsumed = consumeAuthRedirect('/default');
    expect(nextConsumed).toBe('/default');
  });
});
