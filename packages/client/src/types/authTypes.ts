export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  name: string;
  confirmPassword: string;
}

export type FormData = SignupFormData | LoginFormData;
export type FormErrors = Partial<SignupFormData>;
