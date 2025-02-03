import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import { beforeAll, describe, expect, it } from 'vitest';
import ToastProvider from '@/providers/ToastProvider';
import WorkspaceSummaryProvider from '@/providers/WorkspaceSummaryProvider';
import UserProvider from '@/providers/UserProvider';
import ThemeProvider from '@/providers/ThemeProvider';

const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <ThemeProvider>
      <ToastProvider>
        <MemoryRouter initialEntries={['/']}>
          <UserProvider>
            <WorkspaceSummaryProvider>
              <Routes>{ui}</Routes>
            </WorkspaceSummaryProvider>
          </UserProvider>
        </MemoryRouter>
      </ToastProvider>
    </ThemeProvider>
  );
};

beforeAll(() => {
  localStorage.setItem('theme', 'light');
});

describe('main', () => {
  it('renders root component', () => {
    renderWithProviders(
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    );
    expect(screen.getByText('Organize. Collaborate. Succeed.')).toBeInTheDocument();
  });

  it('renders not found page for invalid route', () => {
    renderWithProviders(<Route path="*" element={<NotFound />} />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
