import { beforeEach, describe, it, expect } from 'vitest';
import {
  checkTokenExpiration,
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
  saveTokenToLocalStorage,
} from '../auth';

beforeEach(() => {
  localStorage.clear();
});

describe('getTokenFromLocalStorage', () => {
  it('should return the token from localStorage', () => {
    localStorage.setItem('token', 'test-token');
    expect(getTokenFromLocalStorage()).toBe('test-token');
  });
});

describe('saveTokenToLocalStorage', () => {
  it('should save the token to localStorage', () => {
    expect(localStorage.getItem('token')).toBeNull();
    saveTokenToLocalStorage('test-token');
    expect(localStorage.getItem('token')).toBe('test-token');
  });
});

describe('removeTokenFromLocalStorage', () => {
  it('should remove the token from localStorage', () => {
    localStorage.setItem('token', 'test-token');
    expect(localStorage.getItem('token')).toBe('test-token');
    removeTokenFromLocalStorage();
    expect(localStorage.getItem('token')).toBeNull();
  });
});

describe('checkTokenExpiration', () => {
  it('should return true if the token is expired', async () => {
    const response = new Response('Token expired.', { status: 401 });
    expect(await checkTokenExpiration(response)).toBe(true);
  });

  it('should return false if the token is not expired', async () => {
    const response = new Response('Token not expired.', { status: 401 });
    expect(await checkTokenExpiration(response)).toBe(false);
  });
});
