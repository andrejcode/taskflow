import { WorkspaceDto } from '@server/shared/dtos';
import { createContext } from 'react';

export interface WorkspaceContextType {
  errorMessage: string;
  isLoading: boolean;
  workspaces: WorkspaceDto[] | null;
  addWorkspace: (workspace: WorkspaceDto) => void;
  removeWorkspace: (workspaceId: string) => void;
}

const WorkspacesContext = createContext<WorkspaceContextType | null>(null);

export default WorkspacesContext;
