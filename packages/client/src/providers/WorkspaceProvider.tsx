import { useEffect, useState } from 'react';
import WorkspaceContext from '@/contexts/WorkspacesContext';
import useUserContext from '@/hooks/useUserContext';
import { WorkspaceDto } from '@server/shared/dtos';

export default function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [workspaces, setWorkspaces] = useState<WorkspaceDto[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { token } = useUserContext();

  useEffect(() => {
    if (!token) {
      setWorkspaces(null);
      setIsLoading(false);
      return;
    }

    const fetchWorkspaces = async () => {
      try {
        const response = await fetch('/api/workspaces', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const workspacesDto = (await response.json()) as WorkspaceDto[];
          setWorkspaces(workspacesDto);
        } else if (response.status === 404) {
          setWorkspaces([]);
        } else {
          throw new Error('Unable to get workspaces.');
        }
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unexpected error occurred while getting workspaces.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void fetchWorkspaces();
  }, [setErrorMessage, token]);

  const addWorkspace = (workspace: WorkspaceDto) => {
    setWorkspaces((prevWorkspaces) => {
      if (!prevWorkspaces) {
        return [workspace];
      }

      return [...prevWorkspaces, workspace];
    });
  };

  const removeWorkspace = (workspaceId: string) => {
    setWorkspaces((prevWorkspaces) => {
      if (!prevWorkspaces) {
        return [];
      }

      return prevWorkspaces.filter((workspace) => workspace.id !== workspaceId);
    });
  };

  return (
    <WorkspaceContext.Provider
      value={{
        errorMessage,
        isLoading,
        workspaces,
        addWorkspace,
        removeWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
