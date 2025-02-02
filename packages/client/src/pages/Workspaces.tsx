import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import WorkspaceList from '@/components/WorkspaceList';
import useWorkspaceSummaryContext from '@/hooks/useWorkspaceSummaryContext';

export default function Workspaces() {
  const { workspacesSummary, isLoading } = useWorkspaceSummaryContext();

  return (
    <ProtectedRoute>
      <section className="h-full px-4 md:px-8 lg:px-16">
        <h1 className="mb-4 mt-5 text-3xl lg:mt-10">My Workspaces</h1>

        {isLoading ? <LoadingSpinner /> : <WorkspaceList workspaces={workspacesSummary} />}
      </section>

      <Footer />
    </ProtectedRoute>
  );
}
