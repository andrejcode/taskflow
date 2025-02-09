import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router';
import Header from '../Header';
import UserProvider from '@/providers/UserProvider';
import WorkspaceProvider from '@/providers/WorkspaceProvider';
import ToastProvider from '@/providers/ToastProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import useUserContext from '@/hooks/useUserContext';
import useWorkspaceContext from '@/hooks/useWorkspaceContext';
import { type WorkspaceContextType } from '@/contexts/WorkspacesContext';
import { type UserContextType } from '@/contexts/UserContext';
import { type UserDto } from '@server/shared/dtos';
import { CREATE_WORKSPACE_MODAL } from '@/utils/constants';
import { openModal } from '@/utils/modal';

vi.mock('@/hooks/useUserContext');
vi.mock('@/hooks/useWorkspaceContext');
vi.mock('@/utils/modal', () => ({
  openModal: vi.fn(),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Router>
      <ToastProvider>
        <UserProvider>
          <WorkspaceProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </WorkspaceProvider>
        </UserProvider>
      </ToastProvider>
    </Router>
  );
};

describe('Header', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    // We are setting the theme because window object is not available in JSDOM
    localStorage.setItem('theme', 'light');
  });

  it('renders correctly without user', () => {
    const mockUseUserContext: UserContextType = {
      token: null,
      user: null,
      isLoading: false,
      saveToken: vi.fn(),
      removeToken: vi.fn(),
      saveUser: vi.fn(),
      removeUser: vi.fn(),
    };

    const mockUseWorkspaceContext: WorkspaceContextType = {
      workspaces: [],
      isLoading: false,
      errorMessage: '',
      addWorkspace: vi.fn(),
      removeWorkspace: vi.fn(),
    };

    vi.mocked(useUserContext).mockReturnValue(mockUseUserContext);
    vi.mocked(useWorkspaceContext).mockReturnValue(mockUseWorkspaceContext);

    render(<Header />, { wrapper: TestWrapper });

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders correctly with user and workspaces', () => {
    const mockUser: UserDto = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockUseUserContext: UserContextType = {
      token: '',
      user: mockUser,
      isLoading: false,
      saveToken: vi.fn(),
      removeToken: vi.fn(),
      saveUser: vi.fn(),
      removeUser: vi.fn(),
    };

    const mockUseWorkspaceContext: WorkspaceContextType = {
      workspaces: [
        {
          id: '1',
          name: 'Workspace 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      errorMessage: '',
      isLoading: false,
      addWorkspace: vi.fn(),
      removeWorkspace: vi.fn(),
    };

    vi.mocked(useUserContext).mockReturnValue(mockUseUserContext);
    vi.mocked(useWorkspaceContext).mockReturnValue(mockUseWorkspaceContext);

    render(<Header />, { wrapper: TestWrapper });

    expect(screen.getByText('JD')).toBeInTheDocument();

    const workspaceDropdown = screen.getByTestId('workspaces-summary-dropdown');
    expect(within(workspaceDropdown).getByText('Workspace 1')).toBeInTheDocument();
  });

  it('opens create workspace modal when button is clicked', () => {
    const mockUser: UserDto = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockUseUserContext: UserContextType = {
      token: '',
      user: mockUser,
      isLoading: false,
      saveToken: vi.fn(),
      removeToken: vi.fn(),
      saveUser: vi.fn(),
      removeUser: vi.fn(),
    };

    const mockUseWorkspaceContext: WorkspaceContextType = {
      workspaces: [
        {
          id: '1',
          name: 'Workspace 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      errorMessage: '',
      isLoading: false,
      addWorkspace: vi.fn(),
      removeWorkspace: vi.fn(),
    };

    vi.mocked(useUserContext).mockReturnValue(mockUseUserContext);
    vi.mocked(useWorkspaceContext).mockReturnValue(mockUseWorkspaceContext);

    render(<Header />, { wrapper: TestWrapper });

    const createWorkspaceButton = screen.getByTestId('create-workspace-button');
    fireEvent.click(createWorkspaceButton);
    expect(openModal).toHaveBeenCalledWith(CREATE_WORKSPACE_MODAL);
  });
});
