import { render, screen, fireEvent } from '@testing-library/react';
import WorkspaceList from '../WorkspaceList';
import { CREATE_WORKSPACE_MODAL } from '@/utils/constants';
import { openModal } from '@/utils/modal';
import { vi, describe, it, expect } from 'vitest';

vi.mock('@/utils/modal', () => ({
  openModal: vi.fn(),
}));

vi.mock('react-router', () => ({
  useNavigate: () => vi.fn(),
}));

describe('WorkspaceList', () => {
  it('displays message when there are no workspaces', () => {
    render(<WorkspaceList workspaces={[]} />);
    expect(screen.getByText('There are no workspaces.')).toBeInTheDocument();
  });

  it('opens modal when "Create Workspace" is clicked', () => {
    render(<WorkspaceList workspaces={[]} />);
    const createButton = screen.getByText('Create Workspace');
    fireEvent.click(createButton);
    expect(openModal).toHaveBeenCalledWith(CREATE_WORKSPACE_MODAL);
  });

  it('displays newly created workspace', () => {
    const workspaces = [
      { id: '1', name: 'Workspace 1', createdAt: new Date(), updatedAt: new Date() },
    ];
    render(<WorkspaceList workspaces={workspaces} />);
    expect(screen.getByText('Workspace 1')).toBeInTheDocument();
  });
});
