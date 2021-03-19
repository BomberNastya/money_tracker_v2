import React, { createContext, useState, FC, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';

type UserContext = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const defaultUserState: UserContext = {
  isLoggedIn: false,
  setIsLoggedIn: () => {
    return undefined;
  },
};

export const UserContext = createContext<UserContext>(defaultUserState);

const UserContextProvider: FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const getUser = async (): Promise<void> => {
      try {
        const currentUser: CognitoUser = await Auth.currentAuthenticatedUser();
        setIsLoggedIn(!!currentUser);
      } catch (err) {
        console.log(err);
        setIsLoggedIn(false);
      }
    };
    getUser();
  }, []);
  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
