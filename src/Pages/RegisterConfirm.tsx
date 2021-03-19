import React from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import Notification from '../Components/Notification';

const RegisterConfirm: React.FC = () => {
  const history = useHistory();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & {
      email: { value: string };
      code: { value: string };
    };
    try {
      await Auth.confirmSignUp(target.email.value, target.code.value);
      history.push('/login');
    } catch (err) {
      Notification('Error', err.message, 'danger');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" />
        <input type="text" name="code" />
        <button type="submit">Submit code</button>
      </form>
    </div>
  );
};

export default RegisterConfirm;
