import { WorkspaceSummaryDto } from '@server/shared/dtos';
import { createContext } from 'react';

export interface WorkspaceSummaryContextType {
  errorMessage: string;
  isLoading: boolean;
  workspacesSummary: WorkspaceSummaryDto[] | null;
  addWorkspaceSummary: (workspaceSummary: WorkspaceSummaryDto) => void;
  removeWorkspaceSummary: (workspaceId: string) => void;
}

const WorkspacesSummaryContext = createContext<WorkspaceSummaryContextType | null>(null);

export default WorkspacesSummaryContext;
