import { Outlet } from 'react-router';
import Header from '@/components/Header';

export default function Root() {
  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto py-10 text-center">
          <h1 className="text-primary">Hello, DaisyUI in React!</h1>
        </div>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
