import { z } from 'zod';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Modal from '@/components/ui/Modal';
import FormControl from '@/components/ui/FormControl';
import useToastContext from '@/hooks/useToastContext';
import useWorkspaceContext from '@/hooks/useWorkspaceContext';
import { closeModal } from '@/utils/modal';
import { CREATE_WORKSPACE_MODAL } from '@/utils/constants';
import { nameSchema } from '@server/shared/schemas';
import { WorkspaceDto } from '@server/shared/dtos';
import useUserContext from '@/hooks/useUserContext';

const FORM_ID = 'create-workspace-form';

export default function CreateWorkspaceModal() {
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [workspaceError, setWorkspaceError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useUserContext();
  const { addToast } = useToastContext();
  const { addWorkspace } = useWorkspaceContext();

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      addToast('You are not authenticated.', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const parsedName = nameSchema.parse(workspaceName);

      const response = await fetch('/api/workspaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: parsedName }),
      });

      if (response.ok) {
        addToast('Workspace created successfully.', 'success');
        setWorkspaceName('');
        setWorkspaceError('');
        closeModal(CREATE_WORKSPACE_MODAL);

        const workspace = (await response.json()) as WorkspaceDto;
        addWorkspace({
          id: workspace.id,
          name: workspace.name,
          updatedAt: workspace.updatedAt,
          createdAt: workspace.createdAt,
        });

        void navigate(`/workspaces/${workspace.id}`, { state: { workspace } });
      } else {
        addToast('Unable to create the workspace.', 'error');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setWorkspaceError(error.errors[0].message);
      } else if (error instanceof Error) {
        addToast(error.message, 'error');
      } else {
        addToast('An unexpected error occurred while creating the workspace.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      modalId={CREATE_WORKSPACE_MODAL}
      content={
        <>
          <h3 className="text-lg font-bold">Create Workspace</h3>
          <form id={FORM_ID} onSubmit={(event) => void handleSubmit(event)}>
            <FormControl
              label="Workspace Name"
              name="name"
              type="text"
              placeholder={'workspace'}
              fieldValue={workspaceName}
              fieldError={workspaceError}
              onChange={handleChange}
            />
          </form>
        </>
      }
      action={
        <button className="btn btn-primary" type="submit" disabled={isLoading} form={FORM_ID}>
          Save
        </button>
      }
    />
  );
}
