import { Outlet } from 'react-router';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function WorkspaceLayout() {
  return (
    <ProtectedRoute>
      <div className="drawer flex-grow lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-4">
          <div className="flex flex-row items-center justify-start">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-ghost drawer-button lg:hidden"
              aria-label="Open sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </label>

            <h1 className="ml-2 text-2xl lg:ml-0">Title</h1>
          </div>
          <Outlet />
        </div>
        <div className="drawer-side h-full">
          <label
            htmlFor="my-drawer-2"
            aria-label="Close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu h-full w-52 bg-base-200 p-4 text-base-content">
            <li>
              <span className="text-sm font-bold">USERS</span>
            </li>
            <li>
              <span className="text-sm font-bold">BOARDS</span>
            </li>
            <li>
              <span className="text-sm font-bold">TEXT CHANNELS</span>
            </li>
          </ul>
        </div>
      </div>
    </ProtectedRoute>
  );
}
