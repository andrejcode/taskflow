import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AuthForm from '../AuthForm';
import useAuthForm from '@/hooks/useAuthForm';
import { BrowserRouter as Router } from 'react-router';

vi.mock('@/hooks/useAuthForm');

describe('AuthForm', () => {
  const mockUseAuthForm = {
    formData: { email: '', password: '', name: '', confirmPassword: '' },
    formErrors: {},
    isLoading: false,
    errorMessage: '',
    handleChange: vi.fn(),
    handleSubmit: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useAuthForm).mockReturnValue(mockUseAuthForm);
  });

  it('renders login form correctly', () => {
    render(
      <Router>
        <AuthForm isLogin={true} />
      </Router>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/confirm password/i)).not.toBeInTheDocument();
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
  });

  it('renders signup form correctly', () => {
    render(
      <Router>
        <AuthForm isLogin={false} />
      </Router>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('calls handleSubmit on form submission', () => {
    render(
      <Router>
        <AuthForm isLogin={true} />
      </Router>
    );

    fireEvent.submit(screen.getByRole('button', { name: /log in/i }));
    expect(mockUseAuthForm.handleSubmit).toHaveBeenCalled();
  });

  it('displays error message when error is present', () => {
    mockUseAuthForm.errorMessage = 'Test error';
    render(
      <Router>
        <AuthForm isLogin={true} />
      </Router>
    );

    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });

  it('displays field error message when present', () => {
    mockUseAuthForm.formErrors = { email: 'Invalid email', password: 'Invalid password' };
    render(
      <Router>
        <AuthForm isLogin={false} />
      </Router>
    );

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    expect(screen.getByText(/invalid password/i)).toBeInTheDocument();
  });
});
