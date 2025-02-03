import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Header from '../Header';
import UserProvider from '@/providers/UserProvider';
import WorkspaceSummaryProvider from '@/providers/WorkspaceSummaryProvider';
import ToastProvider from '@/providers/ToastProvider';
import { type UserDto } from '@server/shared/dtos';
import { BrowserRouter as Router } from 'react-router';
import ThemeProvider from '@/providers/ThemeProvider';
import useUserContext from '@/hooks/useUserContext';
import { UserContextType } from '@/contexts/UserContext';

vi.mock('@/hooks/useUserContext');

beforeEach(() => {
  vi.resetAllMocks();

  // We are setting the theme because window object is not available in JSDOM
  localStorage.setItem('theme', 'light');
});

describe('Header', () => {
  it('renders correctly without user', () => {
    const mockUseUserContext: UserContextType = {
      token: null,
      user: null,
      isLoading: false,
      saveToken: vi.fn(),
      removeToken: vi.fn(),
      saveUser: vi.fn(),
      removeUser: vi.fn(),
    };

    vi.mocked(useUserContext).mockReturnValue(mockUseUserContext);

    render(
      <Router>
        <ToastProvider>
          <UserProvider>
            <WorkspaceSummaryProvider>
              <ThemeProvider>
                <Header />
              </ThemeProvider>
            </WorkspaceSummaryProvider>
          </UserProvider>
        </ToastProvider>
      </Router>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders correctly with user', () => {
    const mockUser: UserDto = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockUseUserContext: UserContextType = {
      token: '',
      user: mockUser,
      isLoading: false,
      saveToken: vi.fn(),
      removeToken: vi.fn(),
      saveUser: vi.fn(),
      removeUser: vi.fn(),
    };

    vi.mocked(useUserContext).mockReturnValue(mockUseUserContext);

    render(
      <Router>
        <ToastProvider>
          <UserProvider>
            <WorkspaceSummaryProvider>
              <ThemeProvider>
                <Header />
              </ThemeProvider>
            </WorkspaceSummaryProvider>
          </UserProvider>
        </ToastProvider>
      </Router>
    );

    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});
