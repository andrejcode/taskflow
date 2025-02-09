import { useContext } from 'react';
import WorkspacesContext from '@/contexts/WorkspacesContext';

export default function useWorkspaceContext() {
  const context = useContext(WorkspacesContext);

  if (!context) {
    throw new Error('useWorkspaceContext must be used within a WorkspaceProvider');
  }

  return context;
}
