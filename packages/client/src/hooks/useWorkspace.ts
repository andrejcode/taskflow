import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { WorkspaceDto } from '@server/shared/dtos';
import useUserContext from './useUserContext';

interface LocationState {
  workspace?: WorkspaceDto;
}

export default function useWorkspace() {
  const [workspace, setWorkspace] = useState<WorkspaceDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { token } = useUserContext();

  const { workspaceId } = useParams<{ workspaceId: string }>();
  const location = useLocation() as { state: LocationState | null };

  useEffect(() => {
    if (!workspaceId || !token) {
      setIsLoading(false);
      setWorkspace(null);
      setErrorMessage('Unable to load workspace.');
      return;
    }

    if (location.state?.workspace) {
      setWorkspace(location.state.workspace);
      setIsLoading(false);
      return;
    }

    const fetchWorkspace = async () => {
      try {
        const response = await fetch(`/api/workspaces/${workspaceId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const workspace = (await response.json()) as WorkspaceDto;
        setWorkspace(workspace);
        setErrorMessage('');
      } catch {
        setErrorMessage('Unable to load workspace.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchWorkspace();
  }, [location.state, token, workspaceId]);

  return { workspace, isLoading, errorMessage };
}
