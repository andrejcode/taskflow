import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import { beforeAll, describe, expect, it } from 'vitest';
import ToastProvider from '@/providers/ToastProvider';
import WorkspaceProvider from '@/providers/WorkspaceProvider';
import UserProvider from '@/providers/UserProvider';
import ThemeProvider from '@/providers/ThemeProvider';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <MemoryRouter initialEntries={['/']}>
          <UserProvider>
            <WorkspaceProvider>
              <Routes>{children}</Routes>
            </WorkspaceProvider>
          </UserProvider>
        </MemoryRouter>
      </ToastProvider>
    </ThemeProvider>
  );
};

describe('main', () => {
  beforeAll(() => {
    localStorage.setItem('theme', 'light');
  });

  it('renders root component', () => {
    render(
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>,
      { wrapper: TestWrapper }
    );
    expect(screen.getByText('Organize. Collaborate. Succeed.')).toBeInTheDocument();
  });

  it('renders not found page for invalid route', () => {
    render(<Route path="*" element={<NotFound />} />, { wrapper: TestWrapper });
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
