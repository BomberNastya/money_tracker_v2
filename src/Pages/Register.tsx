import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import Notification from '../Components/Notification';
import {
  validateRequired,
  validateEmail,
  validatePasswordHasLetters,
  validatePasswordLength,
} from '../utils/formValidation';

const Register: React.FC = () => {
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [usernameErrors, setUsernameErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const isFormValid =
    emailErrors.length === 0 &&
    passwordErrors.length === 0 &&
    usernameErrors.length === 0;
  const history = useHistory();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & {
      email: { value: string };
      password: { value: string };
      username: { value: string };
    };
    if (isFormValid) {
      try {
        setLoading(true);
        await Auth.signUp({
          username: target.email.value,
          password: target.password.value,
          attributes: {
            preferred_username: target.username.value,
          },
        });
        history.push('/registerConfirm');
      } catch (err) {
        setLoading(false);
        Notification('Error', err.message, 'danger');
      }
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
      case 'username':
        setUsernameErrors(errors);
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
      case 'username':
        setUsernameErrors([]);
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
          placeholder="E-mail"
          onBlur={validate}
          onFocus={clearErrors}
        />
        {emailErrors.map((err) => (
          <div key={err}>{err}</div>
        ))}
        <input
          type="password"
          name="password"
          placeholder="password"
          onBlur={validate}
          onFocus={clearErrors}
        />
        {passwordErrors.map((err) => (
          <div key={err}>{err}</div>
        ))}
        <input
          type="text"
          name="username"
          placeholder="username"
          onBlur={validate}
          onFocus={clearErrors}
        />
        {usernameErrors.map((err) => (
          <div key={err}>{err}</div>
        ))}
        <button type="submit" disabled={!isFormValid || loading}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
