import { useContext } from 'react';
import WorkspacesSummaryContext from '@/contexts/WorkspacesSummaryContext';

export default function useWorkspaceSummaryContext() {
  const context = useContext(WorkspacesSummaryContext);

  if (!context) {
    throw new Error('useWorkspaceSummaryContext must be used within a WorkspaceSummaryProvider');
  }

  return context;
}
