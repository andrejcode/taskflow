import { useNavigate } from 'react-router';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import WorkspaceList from '@/components/List';
import useWorkspaceSummaryContext from '@/hooks/useWorkspaceSummaryContext';
import { WorkspaceSummaryDto } from '@server/shared/dtos';
import { openModal } from '@/utils/modal';
import { CREATE_WORKSPACE_MODAL } from '@/utils/constants';
import Alert from '@/components/ui/Alert';

export default function Workspaces() {
  const { workspacesSummary, isLoading, errorMessage } = useWorkspaceSummaryContext();
  const navigate = useNavigate();

  const handleClick = (workspace?: WorkspaceSummaryDto) => {
    if (workspace) {
      void navigate(`/workspaces/${workspace.id}`);
      return;
    }

    openModal(CREATE_WORKSPACE_MODAL);
  };

  const getKey = (workspace: WorkspaceSummaryDto) => {
    return workspace.id;
  };

  const getTitle = (workspace: WorkspaceSummaryDto) => {
    return workspace.name;
  };

  return (
    <>
      <section className="h-full px-4 md:px-8 lg:px-16">
        <h1 className="mb-4 mt-5 text-3xl lg:mt-10">My Workspaces</h1>

        {isLoading ? (
          <LoadingSpinner />
        ) : errorMessage ? (
          <Alert message={errorMessage} variant="error" />
        ) : (
          workspacesSummary && (
            <WorkspaceList
              items={workspacesSummary}
              listName="workspaces"
              getKey={getKey}
              getTitle={getTitle}
              onClick={handleClick}
            />
          )
        )}
      </section>

      <Footer />
    </>
  );
}
