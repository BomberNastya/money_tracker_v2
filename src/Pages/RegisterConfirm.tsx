import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import Notification from '../Components/Notification';
import { validateRequired, validateEmail } from '../utils/formValidation';

const RegisterConfirm: React.FC = () => {
  const history = useHistory();
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [codeErrors, setCodeErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const isFormValid = emailErrors.length === 0 && codeErrors.length === 0;
  const validate = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errors: string[] = [];
    const isEmpty = validateRequired(value, name);
    const isInvalidEmail = validateEmail(value, name);
    if (isEmpty) {
      errors.push(isEmpty);
    }
    if (isInvalidEmail) {
      errors.push(isInvalidEmail);
    }
    switch (name) {
      case 'email':
        setEmailErrors(errors);
        break;
      case 'code':
        setCodeErrors(errors);
        break;
      default:
    }
  };
  const clearErrors = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'email':
        setEmailErrors([]);
        break;
      case 'code':
        setCodeErrors([]);
        break;
      default:
    }
  };
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & {
      email: { value: string };
      code: { value: string };
    };
    try {
      setLoading(true);
      await Auth.confirmSignUp(target.email.value, target.code.value);
      history.push('/login');
    } catch (err) {
      setLoading(false);
      Notification('Error', err.message, 'danger');
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
          type="text"
          name="code"
          onBlur={validate}
          onFocus={clearErrors}
        />
        {codeErrors.map((err) => (
          <div key={err}>{err}</div>
        ))}
        <button type="submit" disabled={!isFormValid || loading}>
          Submit code
        </button>
      </form>
    </div>
  );
};

export default RegisterConfirm;
