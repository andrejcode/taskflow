import { useEffect, useState } from 'react';
import WorkspacesSummaryContext from '@/contexts/WorkspacesSummaryContext.ts';
import { WorkspaceSummaryDto } from '@server/shared/dtos';
import useToastContext from '@/hooks/useToastContext';
import { getUserToken } from '@/utils/auth';

export default function WorkspaceSummaryProvider({ children }: { children: React.ReactNode }) {
  const [workspacesSummary, setWorkspacesSummary] = useState<WorkspaceSummaryDto[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToastContext();

  useEffect(() => {
    const token = getUserToken();

    if (!token) {
      setIsLoading(false);
      return;
    }

    const fetchWorkspacesSummary = async () => {
      try {
        const response = await fetch('/api/workspaces', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const workspacesSummaryDto = (await response.json()) as WorkspaceSummaryDto[];
          setWorkspacesSummary(workspacesSummaryDto);
        } else if (response.status === 404) {
          setWorkspacesSummary([]);
        } else {
          throw new Error('Unable to get workspaces summary.');
        }
      } catch (error) {
        if (error instanceof Error) {
          addToast(error.message, 'error');
        } else {
          addToast('An unexpected error occurred while getting workspaces.', 'error');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void fetchWorkspacesSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addWorkspaceSummary = (workspaceSummary: WorkspaceSummaryDto) => {
    setWorkspacesSummary((prevWorkspacesSummary) => {
      if (!prevWorkspacesSummary) {
        return [workspaceSummary];
      }

      return [...prevWorkspacesSummary, workspaceSummary];
    });
  };

  return (
    <WorkspacesSummaryContext.Provider
      value={{ workspacesSummary, addWorkspaceSummary, isLoading }}
    >
      {children}
    </WorkspacesSummaryContext.Provider>
  );
}
