import { WorkspaceSummaryDto } from '@server/shared/dtos';
import { createContext } from 'react';

export interface WorkspacesSummaryContextType {
  workspacesSummary: WorkspaceSummaryDto[] | null;
  addWorkspaceSummary: (workspaceSummary: WorkspaceSummaryDto) => void;
  isLoading: boolean;
}

const WorkspacesSummaryContext = createContext<WorkspacesSummaryContextType | null>(null);

export default WorkspacesSummaryContext;
