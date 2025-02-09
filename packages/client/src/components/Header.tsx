import { Link } from 'react-router';
import ThemeController from './ThemeController';
import Avatar from './ui/Avatar';
import Dropdown from './ui/Dropdown';
import LoadingSpinner from './ui/LoadingSpinner';
import useUserContext from '@/hooks/useUserContext';
import useWorkspaceContext from '@/hooks/useWorkspaceContext';
import { openModal } from '@/utils/modal';

export default function Header() {
  const { user, isLoading: isUserLoading, removeUser, removeToken } = useUserContext();
  const { isLoading: isWorkspacesSummaryLoading, workspaces } = useWorkspaceContext();

  const handleLogout = () => {
    removeUser();
    removeToken();
  };

  return (
    <header>
      <nav className="navbar bg-base-300">
        <div className="navbar-start">
          <Dropdown
            buttonClassName="btn-ghost lg:hidden"
            trigger={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            }
            content={
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li>
                  <Link to="/workspaces">Workspaces</Link>
                  <ul className="p-2">
                    {isWorkspacesSummaryLoading ? (
                      <li>
                        <LoadingSpinner size="xs" />
                      </li>
                    ) : !workspaces || workspaces.length === 0 ? (
                      <li>No workspaces</li>
                    ) : (
                      workspaces?.map((workspace) => (
                        <li key={workspace.id}>
                          <Link to={`/workspaces/${workspace.id}`}>{workspace.name}</Link>
                        </li>
                      ))
                    )}
                  </ul>
                </li>
              </ul>
            }
          />

          <Link to="/" className="btn btn-ghost text-xl">
            TaskFlow
          </Link>
        </div>

        {user && (
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary>Workspaces</summary>
                  <ul data-testid="workspaces-summary-dropdown" className="z-[1] bg-base-100 p-2">
                    {isWorkspacesSummaryLoading ? (
                      <li>
                        <LoadingSpinner size="xs" />
                      </li>
                    ) : !workspaces || workspaces.length === 0 ? (
                      <li className="w-36">
                        <span>No workspaces</span>
                      </li>
                    ) : (
                      workspaces?.map((workspace) => (
                        <li key={workspace.id}>
                          {/* Clicking on the workspace will not close the dropdown by default. Adding 
                              on click handler to remove open attribute from details tag will. */}
                          <Link
                            onClick={(e) => {
                              e.currentTarget.closest('details')?.removeAttribute('open');
                            }}
                            to={`/workspaces/${workspace.id}`}
                          >
                            {workspace.name}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </details>
              </li>
            </ul>

            <button
              data-testid="create-workspace-button"
              className="btn btn-circle btn-primary btn-sm"
              onClick={() => openModal('create-workspace-modal')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        )}

        <div className="navbar-end">
          <ThemeController />
          <div className="mr-3" />
          {isUserLoading ? (
            <LoadingSpinner />
          ) : user ? (
            <>
              <Dropdown
                className="dropdown-end"
                buttonClassName="btn-circle btn-ghost"
                trigger={<Avatar name={user.name} />}
                content={
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                  >
                    <li>
                      <Link to="/profile" className="justify-between">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                }
              />
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
