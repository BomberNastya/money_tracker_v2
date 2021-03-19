import React, { useContext, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../utils/userContextProvider';
import Notification from '../Components/Notification';
import {
  validateEmail,
  validatePasswordHasLetters,
  validatePasswordLength,
  validateRequired,
} from '../utils/formValidation';

const Login: React.FC = () => {
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const isFormValid = emailErrors.length === 0 && passwordErrors.length === 0;
  const history = useHistory();
  const { setIsLoggedIn } = useContext(UserContext);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & {
      email: { value: string };
      password: { value: string };
    };
    try {
      setLoading(true);
      await Auth.signIn(target.email.value, target.password.value);
      setIsLoggedIn(true);
      history.push('/');
    } catch (err) {
      setLoading(false);
      Notification('Error', err.message, 'danger');
    }
  };

  const validate = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errors: string[] = [];
    const isEmpty = validateRequired(value, name);
    const isInvalidEmail = validateEmail(value, name);
    const isPasswordHasLetters = validatePasswordHasLetters(value, name);
    const isPasswordLength = validatePasswordLength(value, name);
    if (isEmpty) {
      errors.push(isEmpty);
    }
    if (isInvalidEmail) {
      errors.push(isInvalidEmail);
    }
    if (isPasswordHasLetters) {
      errors.push(isPasswordHasLetters);
    }
    if (isPasswordLength) {
      errors.push(isPasswordLength);
    }
    switch (name) {
      case 'email':
        setEmailErrors(errors);
        break;
      case 'password':
        setPasswordErrors(errors);
        break;
      default:
    }
  };

  const clearErrors = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'email':
        setEmailErrors([]);
        break;
      case 'password':
        setPasswordErrors([]);
        break;
      default:
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          onBlur={validate}
          onFocus={clearErrors}
        />
        {emailErrors.map((err) => (
          <div key={err}>{err}</div>
        ))}
        <input
          type="password"
          name="password"
          onBlur={validate}
          onFocus={clearErrors}
        />
        {passwordErrors.map((err) => (
          <div key={err}>{err}</div>
        ))}
        <button type="submit" disabled={!isFormValid || loading}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
