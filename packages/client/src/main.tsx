import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import RootLayout from './layouts/RootLayout.tsx';
import WorkspaceLayout from './layouts/WorkspaceLayout.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Workspaces from './pages/Workspaces.tsx';
import Workspace from './pages/Workspace.tsx';
import NotFound from './pages/NotFound.tsx';
import Profile from './pages/Profile.tsx';
import UserProvider from './providers/UserProvider.tsx';
import ThemeProvider from './providers/ThemeProvider.tsx';
import WorkspaceProvider from './providers/WorkspaceProvider.tsx';
import ToastProvider from './providers/ToastProvider.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ToastProvider>
        <UserProvider>
          <WorkspaceProvider>
            <ThemeProvider>
              <Routes>
                <Route element={<RootLayout />}>
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="workspaces">
                    <Route
                      index
                      element={
                        <ProtectedRoute>
                          <Workspaces />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      element={
                        <ProtectedRoute>
                          <WorkspaceLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route path=":workspaceId" element={<Workspace />} />
                    </Route>
                  </Route>
                  <Route
                    path="profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </ThemeProvider>
          </WorkspaceProvider>
        </UserProvider>
      </ToastProvider>
    </Router>
  </StrictMode>
);
