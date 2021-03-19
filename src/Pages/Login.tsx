import React, { useContext } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../utils/userContextProvider';

const Login: React.FC = () => {
  const history = useHistory();
  const { setIsLoggedIn } = useContext(UserContext);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as EventTarget & {
      email: { value: string };
      password: { value: string };
    };
    try {
      await Auth.signIn(target.email.value, target.password.value);
      setIsLoggedIn(true);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
