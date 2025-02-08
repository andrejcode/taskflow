import { render, screen, fireEvent } from '@testing-library/react';
import { CREATE_WORKSPACE_MODAL } from '@/utils/constants';
import { openModal } from '@/utils/modal';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Workspaces from '../Workspaces';
import WorkspaceSummaryProvider from '@/providers/WorkspaceSummaryProvider';
import UserProvider from '@/providers/UserProvider';
import ToastProvider from '@/providers/ToastProvider';
import { BrowserRouter as Router } from 'react-router';
import { WorkspaceSummaryContextType } from '@/contexts/WorkspaceSummaryContext';

vi.mock('@/utils/modal', () => ({
  openModal: vi.fn(),
}));

const mockWorkspaceSummaryContext: WorkspaceSummaryContextType = {
  workspacesSummary: [],
  isLoading: false,
  errorMessage: '',
  addWorkspaceSummary: vi.fn(),
  removeWorkspaceSummary: vi.fn(),
};

// Mock the hook once with the mockImplementation
vi.mock('@/hooks/useWorkspaceSummaryContext', () => ({
  default: vi.fn(() => mockWorkspaceSummaryContext),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Router>
      <ToastProvider>
        <UserProvider>
          <WorkspaceSummaryProvider>{children}</WorkspaceSummaryProvider>
        </UserProvider>
      </ToastProvider>
    </Router>
  );
};

describe('Workspaces', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    mockWorkspaceSummaryContext.workspacesSummary = [];
    mockWorkspaceSummaryContext.isLoading = false;
    mockWorkspaceSummaryContext.errorMessage = '';
  });

  it('displays message when there are no workspaces', () => {
    render(<Workspaces />, { wrapper: TestWrapper });
    expect(screen.getByText('There are no workspaces.')).toBeInTheDocument();
  });

  it('opens modal when "Create Workspace" is clicked', () => {
    render(<Workspaces />, { wrapper: TestWrapper });
    const createButton = screen.getByText('Create Workspace');
    fireEvent.click(createButton);
    expect(openModal).toHaveBeenCalledWith(CREATE_WORKSPACE_MODAL);
  });

  it('displays newly created workspace', () => {
    mockWorkspaceSummaryContext.workspacesSummary = [
      { id: '1', name: 'Workspace 1', createdAt: new Date(), updatedAt: new Date() },
    ];

    render(<Workspaces />, { wrapper: TestWrapper });
    expect(screen.getByText('Workspace 1')).toBeInTheDocument();
  });

  it('displays loading spinner when loading', () => {
    mockWorkspaceSummaryContext.isLoading = true;
    render(<Workspaces />, { wrapper: TestWrapper });
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    mockWorkspaceSummaryContext.errorMessage = 'Error Message';
    render(<Workspaces />, { wrapper: TestWrapper });

    const alert = screen.getByTestId('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Error Message');
  });
});
