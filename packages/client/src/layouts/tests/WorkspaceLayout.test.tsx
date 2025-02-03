import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import WorkspaceLayout from '../WorkspaceLayout';
import useWorkspace from '@/hooks/useWorkspace';
import { WorkspaceDto } from '@server/shared/dtos';
import UserProvider from '@/providers/UserProvider';
import ToastProvider from '@/providers/ToastProvider';
import useUserContext from '@/hooks/useUserContext';

vi.mock('@/hooks/useWorkspace');
vi.mock('@/hooks/useUserContext');

vi.mocked(useUserContext).mockReturnValue({
  user: {
    id: '1',
    email: 'test@test.com',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  token: 'fake-token',
  saveToken: vi.fn(),
  removeToken: vi.fn(),
  saveUser: vi.fn(),
  removeUser: vi.fn(),
  isLoading: false,
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouter initialEntries={['/workspaces/123']}>
      <ToastProvider>
        <UserProvider>{children}</UserProvider>
      </ToastProvider>
    </MemoryRouter>
  );
};

describe('WorkspaceLayout', () => {
  const mockWorkspace: WorkspaceDto = {
    id: '123',
    name: 'Test Workspace',
    createdAt: new Date(),
    updatedAt: new Date(),
    users: [],
    boards: [],
    textChannels: [],
  };

  const renderComponent = () => {
    return render(<WorkspaceLayout />, {
      wrapper: TestWrapper,
    });
  };

  it('should show loading state', () => {
    vi.mocked(useWorkspace).mockReturnValue({
      workspace: null,
      isLoading: true,
      errorMessage: '',
    });

    renderComponent();

    const spinners = screen.getAllByTestId('loading-spinner');
    expect(spinners.length).toBeGreaterThan(0);
  });

  it('should show error message when workspace fails to load', () => {
    vi.mocked(useWorkspace).mockReturnValue({
      workspace: null,
      isLoading: false,
      errorMessage: 'Unable to load workspace.',
    });

    renderComponent();

    expect(screen.getByText('Unable to load workspace.')).toBeInTheDocument();
  });

  it('should render workspace layout when workspace loads', () => {
    vi.mocked(useWorkspace).mockReturnValue({
      workspace: mockWorkspace,
      isLoading: false,
      errorMessage: '',
    });

    renderComponent();

    expect(screen.getByText('Test Workspace')).toBeInTheDocument();
  });
});
