import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
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
      </ul>
      <ul>
        <li>
          <NavLink to="/login">Sign In</NavLink>
        </li>
        <li>
          <NavLink to="/register">Sign up</NavLink>
        </li>
        <li>
          <button type="button">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
