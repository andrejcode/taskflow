import useAuthForm from '@/hooks/useAuthForm';
import { Link } from 'react-router';
import { type SignupFormData } from '@/types';
import FormControl from './FormControl';
import ErrorAlert from './ErrorAlert';

export default function AuthForm({ isLogin }: { isLogin: boolean }) {
  const { formData, formErrors, isLoading, error, handleChange, handleSubmit } =
    useAuthForm(isLogin);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="card w-full max-w-sm shrink-0 bg-base-200 shadow-2xl">
        {error && <ErrorAlert error={error} />}

        <form className="card-body" onSubmit={(event) => void handleSubmit(event)}>
          {!isLogin && (
            <FormControl
              label="Name"
              type="text"
              name="name"
              placeholder="name"
              fieldValue={(formData as SignupFormData).name}
              fieldError={formErrors.name}
              onChange={handleChange}
            />
          )}

          <FormControl
            label="Email"
            type="email"
            name="email"
            placeholder="email"
            fieldValue={formData.email}
            fieldError={formErrors.email}
            onChange={handleChange}
          />

          <FormControl
            label="Password"
            type="password"
            name="password"
            placeholder="password"
            fieldValue={formData.password}
            fieldError={formErrors.password}
            onChange={handleChange}
          />

          {!isLogin && (
            <FormControl
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              fieldValue={(formData as SignupFormData).confirmPassword}
              fieldError={formErrors.confirmPassword}
              onChange={handleChange}
            />
          )}

          <div className="form-control mt-6">
            <button type="submit" disabled={isLoading} className="btn btn-primary">
              {isLogin ? 'Log in' : 'Sign up'}
            </button>
          </div>
          <label className="label">
            <Link to={isLogin ? '/signup' : '/login'} className="link-hover link label-text-alt">
              {isLogin ? 'Create an account' : 'Already have an account?'}
            </Link>
          </label>
        </form>
      </div>
    </div>
  );
}
