import { Outlet } from 'react-router';
import Header from '@/components/Header';
import CreateWorkspaceModal from '@/components/CreateWorkspaceModal';

export default function Root() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex flex-grow flex-col">
        <Outlet />
      </main>

      <CreateWorkspaceModal />
    </div>
  );
}
