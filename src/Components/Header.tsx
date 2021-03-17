import React from 'react';
import { NavLink } from 'react-router-dom';
import useGetUser from '../hooks/useGetUser';

const Header: React.FC = () => {
  const { user } = useGetUser();
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {user ? (
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
      {user && (
        <li>
          <button type="button">Logout</button>
        </li>
      )}
    </nav>
  );
};

export default Header;
