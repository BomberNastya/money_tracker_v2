import React from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

const Register: React.FC = () => {
  const history = useHistory();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & {
      email: { value: string };
      password: { value: string };
      username: { value: string };
    };
    try {
      await Auth.signUp({
        username: target.email.value,
        password: target.password.value,
        attributes: {
          preferred_username: target.username.value,
        },
      });
      history.push('/registerConfirm');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="E-mail" />
        <input type="password" name="password" placeholder="password" />
        <input type="text" name="username" placeholder="username" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
