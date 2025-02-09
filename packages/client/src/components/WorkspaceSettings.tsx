import { useNavigate } from 'react-router';
import Modal from './ui/Modal';
import useToastContext from '@/hooks/useToastContext';
import useUserContext from '@/hooks/useUserContext';
import useWorkspaceContext from '@/hooks/useWorkspaceContext';
import { openModal } from '@/utils/modal';
import { DELETE_WORKSPACE_MODAL } from '@/utils/constants';
import { WorkspaceDto } from '@server/shared/dtos';

export default function WorkspaceSettings({ workspace }: { workspace: WorkspaceDto }) {
  const { token } = useUserContext();
  const { addToast } = useToastContext();
  const { removeWorkspace } = useWorkspaceContext();
  const navigate = useNavigate();

  const handleDeleteWorkspace = async () => {
    const response = await fetch(`/api/workspaces/${workspace.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      void navigate('/workspaces');
      removeWorkspace(workspace.id);
      addToast('Workspace deleted successfully.', 'success');
    } else {
      addToast('Failed to delete workspace.', 'error');
    }
  };

  return (
    <>
      <h2 className="mb-2 text-lg">Settings</h2>
      <button onClick={() => openModal(DELETE_WORKSPACE_MODAL)} className="btn btn-error w-40">
        Delete Workspace
      </button>

      <Modal
        modalId={DELETE_WORKSPACE_MODAL}
        content={
          <>
            <h3 className="text-lg font-bold">Delete Workspace</h3>
            <p>Are you sure you want to delete this workspace?</p>
          </>
        }
        action={
          <button onClick={() => void handleDeleteWorkspace()} className="btn btn-error">
            Delete
          </button>
        }
      />
    </>
  );
}
