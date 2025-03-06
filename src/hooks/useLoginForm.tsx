import { useState } from 'react';

interface Errors {
  email: string;
  password: string;
}

const useLoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<Errors>({ email: '', password: '' });

  const validate = (): boolean => {
    let errors: Errors = { email: '', password: '' };


    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }


    if (password.length < 6 || password.length > 12) {
      errors.password = 'Password must be between 6 and 12 characters.';
    }

    setError(errors);
    

    return !errors.email && !errors.password;
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    onSuccess: () => void
  ): void => {
    e.preventDefault();
    if (validate()) {
      onSuccess();
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};

export default useLoginForm;