import WorkspaceSettings from '@/components/WorkspaceSettings';
import useUserContext from '@/hooks/useUserContext';
import { WorkspaceDto } from '@server/shared/dtos';
import { useOutletContext } from 'react-router';

interface WorkspaceContext {
  workspace: WorkspaceDto;
}

export default function Workspace() {
  const { workspace } = useOutletContext<WorkspaceContext>();
  const { user } = useUserContext();

  const isUserAdmin = () => {
    const userRole = workspace.users.find((userFound) =>
      typeof userFound.user === 'string'
        ? userFound.user === user!.id
        : userFound.user.id === user!.id
    );
    return userRole?.role === 'admin';
  };

  return (
    <>
      <h2 className="my-2 text-lg">Boards {workspace.boards.length}</h2>
      {/* TODO: Add boards content here */}

      <h2 className="mb-2 text-lg">Text Channels {workspace.textChannels.length}</h2>
      {/* TODO: Add text channels here */}

      {isUserAdmin() && <WorkspaceSettings workspace={workspace} />}
    </>
  );
}
