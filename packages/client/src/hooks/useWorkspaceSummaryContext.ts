import { useContext } from 'react';
import WorkspaceSummaryContext from '@/contexts/WorkspaceSummaryContext';

export default function useWorkspaceSummaryContext() {
  const context = useContext(WorkspaceSummaryContext);

  if (!context) {
    throw new Error('useWorkspaceSummaryContext must be used within a WorkspaceSummaryProvider');
  }

  return context;
}
