import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Amplify from 'aws-amplify';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Header from './Components/Header';
import Routes from './Components/Routes';
import COGNITO from './configs/aws';
import UserContextProvider from './utils/userContextProvider';

Amplify.configure({
  aws_cognito_region: COGNITO.REGION,
  aws_user_pools_id: COGNITO.USER_POOL_ID,
  aws_user_pools_web_client_id: COGNITO.APP_CLIENT_ID,
});

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <ReactNotification />
        <Header />
        <Routes />
      </UserContextProvider>
    </BrowserRouter>
  );
};

export default App;
