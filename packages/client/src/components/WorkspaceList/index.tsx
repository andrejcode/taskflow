import { WorkspaceSummaryDto } from '@server/shared/dtos';
import WorkspaceItem from './WorkspaceItem';
import { useNavigate } from 'react-router';
import { openModal } from '@/utils/modal';
import { CREATE_WORKSPACE_MODAL } from '@/utils/constants';

export default function WorkspaceList({
  workspaces,
}: {
  workspaces: WorkspaceSummaryDto[] | null;
}) {
  const navigate = useNavigate();

  const handleClick = (workspace?: WorkspaceSummaryDto) => {
    if (workspace) {
      void navigate(`/workspaces/${workspace.id}`);
      return;
    }

    openModal(CREATE_WORKSPACE_MODAL);
  };

  return (
    <>
      {workspaces?.length === 0 && <p className="mb-3">There are no workspaces.</p>}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {workspaces &&
          workspaces.map((workspace) => (
            <WorkspaceItem
              key={workspace.id}
              title={workspace.name}
              onClick={() => handleClick(workspace)}
            />
          ))}

        <WorkspaceItem title="Create Workspace" variant="secondary" onClick={() => handleClick()} />
      </ul>
    </>
  );
}
