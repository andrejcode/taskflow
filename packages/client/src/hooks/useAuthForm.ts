import { useState } from 'react';
import { z } from 'zod';
import { signupSchema, loginSchema } from '@server/shared/schemas/';
import { LoginFormData, SignupFormData, FormData, FormErrors } from '@/types';
import { UserDto } from '@server/shared/dtos';
import useUserContext from './useUserContext';

const initialLoginFormData: LoginFormData = {
  email: '',
  password: '',
};

const initialSignupFormData: SignupFormData = {
  name: '',
  ...initialLoginFormData,
  confirmPassword: '',
};

export default function useAuthForm(isLogin: boolean) {
  const [formData, setFormData] = useState<FormData>(
    isLogin ? initialLoginFormData : initialSignupFormData
  );
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { saveUser, saveToken } = useUserContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        loginSchema.parse(formData);
      } else {
        signupSchema.parse(formData);
      }
      setFormErrors({});

      const response = await fetch(`/api/users/${isLogin ? 'login' : 'signup'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setError(null);

        const { token, user } = (await response.json()) as { token: string; user: UserDto };

        saveToken(token);
        saveUser(user);
      } else {
        const responseText = await response.text();
        setError(responseText);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap = error.errors.reduce((acc: Record<string, string>, curr) => {
          acc[curr.path[0] as string] = curr.message;
          return acc;
        }, {});

        setFormErrors(errorMap);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, formErrors, isLoading, error, handleChange, handleSubmit };
}
