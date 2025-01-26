import { renderHook } from '@testing-library/react';
import { useNavigate } from 'react-router';
import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import useHandleTokenExpiration from '../useHandleTokenExpiration';
import { removeUserToken } from '@/utils/auth';

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('@/utils/auth', () => ({
  removeUserToken: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useHandleTokenExpiration', () => {
  it('should navigate to /login and remove user token on token expiration', async () => {
    const navigate = vi.fn();

    (useNavigate as Mock).mockReturnValue(navigate);

    const { result } = renderHook(() => useHandleTokenExpiration());

    const response = new Response('Token expired.', { status: 401 });
    await result.current.checkTokenExpiration(response);

    expect(removeUserToken).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/login');
  });

  it('should not navigate or remove user token if response is not 401 or message is not "Token expired."', async () => {
    const navigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigate);

    const { result } = renderHook(() => useHandleTokenExpiration());

    const response = new Response('Some other message', { status: 401 });
    await result.current.checkTokenExpiration(response);

    expect(removeUserToken).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });
});
