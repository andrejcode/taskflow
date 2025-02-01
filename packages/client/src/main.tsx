import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Root from './pages/Root.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Workspaces from './pages/Workspaces.tsx';
import Workspace from './pages/Workspace.tsx';
import NotFound from './pages/NotFound.tsx';
import UserProvider from './providers/UserProvider.tsx';
import ThemeProvider from './providers/ThemeProvider.tsx';
import WorkspaceSummaryProvider from './providers/WorkspaceSummaryProvider.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import './index.css';
import ToastProvider from './providers/ToastProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ToastProvider>
        <UserProvider>
          <WorkspaceSummaryProvider>
            <ThemeProvider>
              <Routes>
                <Route path="/" element={<Root />}>
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
                      path=":workspaceId"
                      element={
                        <ProtectedRoute>
                          <Workspace />
                        </ProtectedRoute>
                      }
                    />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </ThemeProvider>
          </WorkspaceSummaryProvider>
        </UserProvider>
      </ToastProvider>
    </Router>
  </StrictMode>
);
