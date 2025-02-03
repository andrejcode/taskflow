import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLocation, useParams } from 'react-router';
import { WorkspaceDto } from '@server/shared/dtos';
import useWorkspace from '../useWorkspace';
import useUserContext from '../useUserContext';
import { UserContextType } from '@/contexts/UserContext';

vi.mock('react-router', () => ({
  useLocation: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('../useUserContext');

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('useWorkspace', () => {
  const mockUserContext: UserContextType = {
    token: 'mock-token',
    user: null,
    isLoading: false,
    saveToken: vi.fn(),
    removeToken: vi.fn(),
    saveUser: vi.fn(),
    removeUser: vi.fn(),
  };

  const mockLocation = {
    pathname: '/workspace/123',
    search: '',
    hash: '',
    state: null,
    key: 'default',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
  });

  it('should return error when workspaceId is not provided', () => {
    vi.mocked(useParams).mockReturnValue({});
    vi.mocked(useLocation).mockReturnValue(mockLocation);
    vi.mocked(useUserContext).mockReturnValue(mockUserContext);

    const { result } = renderHook(() => useWorkspace());

    expect(result.current.errorMessage).toBe('Unable to load workspace.');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.workspace).toBeNull();
  });

  it('should return error when token is not provided', () => {
    vi.mocked(useParams).mockReturnValue({ workspaceId: '123' });
    vi.mocked(useLocation).mockReturnValue(mockLocation);
    vi.mocked(useUserContext).mockReturnValue({ ...mockUserContext, token: '' });

    const { result } = renderHook(() => useWorkspace());

    expect(result.current.errorMessage).toBe('Unable to load workspace.');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.workspace).toBeNull();
  });

  it('should use workspace from location state if available', async () => {
    const workspaceData: WorkspaceDto = {
      id: '123',
      name: 'Test Workspace',
      createdAt: new Date(),
      updatedAt: new Date(),
      users: [],
      boards: [],
      textChannels: [],
    };

    vi.mocked(useParams).mockReturnValue({ workspaceId: '123' });
    vi.mocked(useLocation).mockReturnValue({
      ...mockLocation,
      state: { workspace: workspaceData },
    });
    vi.mocked(useUserContext).mockReturnValue(mockUserContext);

    const { result } = renderHook(() => useWorkspace());

    await waitFor(() => {
      expect(result.current.workspace).toEqual(workspaceData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.errorMessage).toBe('');
    });

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should fetch workspace from API when not in location state', async () => {
    const workspaceData: WorkspaceDto = {
      id: '123',
      name: 'Test Workspace',
      createdAt: new Date(),
      updatedAt: new Date(),
      users: [],
      boards: [],
      textChannels: [],
    };

    vi.mocked(useParams).mockReturnValue({ workspaceId: '123' });
    vi.mocked(useLocation).mockReturnValue(mockLocation);
    vi.mocked(useUserContext).mockReturnValue(mockUserContext);

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(workspaceData),
    });

    const { result } = renderHook(() => useWorkspace());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.workspace).toEqual(workspaceData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.errorMessage).toBe('');
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/workspaces/123', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer mock-token',
      },
    });
  });

  it('should handle API errors', async () => {
    vi.mocked(useParams).mockReturnValue({ workspaceId: '123' });
    vi.mocked(useLocation).mockReturnValue(mockLocation);
    vi.mocked(useUserContext).mockReturnValue(mockUserContext);

    mockFetch.mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useWorkspace());

    await waitFor(() => {
      expect(result.current.errorMessage).toBe('Unable to load workspace.');
      expect(result.current.isLoading).toBe(false);
      expect(result.current.workspace).toBeNull();
    });
  });
});
