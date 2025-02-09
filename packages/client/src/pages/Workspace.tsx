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
    const member = workspace.members.find((member) => member.user === user!.id);
    return member?.role === 'admin';
  };

  return (
    <>
      <h2 className="mb-1 mt-2 text-lg">Recent Activity</h2>
      <p className="mb-2 text-sm">There is no recent activity.</p>

      {isUserAdmin() && <WorkspaceSettings workspace={workspace} />}
    </>
  );
}
