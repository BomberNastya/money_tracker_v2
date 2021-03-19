import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { UserContext } from '../utils/userContextProvider';
import Notification from './Notification';

const Header: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const history = useHistory();
  const handleLogout = async () => {
    try {
      await Auth.signOut();
      setIsLoggedIn(false);
      history.push('/login');
    } catch (error) {
      Notification('Error', error.message, 'danger');
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <NavLink to="/sections">Sections</NavLink>
            </li>
            <li>
              <NavLink to="/categories">Categories</NavLink>
            </li>
            <li>
              <NavLink to="/entries">Entries</NavLink>
            </li>
            <li>
              <NavLink to="/charts">Charts</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Sign In</NavLink>
            </li>
            <li>
              <NavLink to="/register">Sign up</NavLink>
            </li>
          </>
        )}
      </ul>
      {isLoggedIn && (
        <li>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      )}
    </nav>
  );
};

export default Header;
