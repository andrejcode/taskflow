import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import Root from '../pages/Root';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import { beforeAll, describe, expect, it } from 'vitest';
import ToastProvider from '@/providers/ToastProvider';
import WorkspaceSummaryProvider from '@/providers/WorkspaceSummaryProvider';
import UserProvider from '@/providers/UserProvider';
import ThemeProvider from '@/providers/ThemeProvider';

beforeAll(() => {
  localStorage.setItem('theme', 'light');
});

describe('main', () => {
  it('renders root component', () => {
    render(
      <ThemeProvider>
        <ToastProvider>
          <MemoryRouter initialEntries={['/']}>
            <UserProvider>
              <WorkspaceSummaryProvider>
                <Routes>
                  <Route path="/" element={<Root />}>
                    <Route index element={<Home />} />
                  </Route>
                </Routes>
              </WorkspaceSummaryProvider>
            </UserProvider>
          </MemoryRouter>
        </ToastProvider>
      </ThemeProvider>
    );
    expect(screen.getByText('Organize. Collaborate. Succeed.')).toBeInTheDocument();
  });

  it('renders not found page for invalid route', () => {
    render(
      <ThemeProvider>
        <ToastProvider>
          <MemoryRouter initialEntries={['/invalid-route']}>
            <UserProvider>
              <WorkspaceSummaryProvider>
                <Routes>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </WorkspaceSummaryProvider>
            </UserProvider>
          </MemoryRouter>
        </ToastProvider>
      </ThemeProvider>
    );
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
