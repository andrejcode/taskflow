import { useOutletContext } from 'react-router';
import { WorkspaceDto } from '@server/shared/dtos';

interface WorkspaceContext {
  workspace: WorkspaceDto;
}

export default function Workspace() {
  const { workspace } = useOutletContext<WorkspaceContext>();
  return (
    <>
      <h2 className="my-2 text-lg">Boards {workspace.boards.length}</h2>
      {/* TODO: Add boards content here */}

      <h2 className="mb-2 text-lg">Text Channels {workspace.textChannels.length}</h2>
      {/* TODO: Add text channels here */}

      <h2 className="mb-2 text-lg">Settings</h2>
      {/* TODO: Implement settings feature */}
      <div className="flex w-40 flex-col gap-2">
        <button className="btn btn-primary">Edit Workspace</button>
        <button className="btn btn-error">Delete Workspace</button>
      </div>
    </>
  );
}
