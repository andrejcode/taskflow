import { Outlet } from 'react-router';
import Header from '@/components/Header';

export default function Root() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
