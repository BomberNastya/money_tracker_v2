import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import Routes from './Components/Routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes />
      </div>
    </BrowserRouter>
  );
};

export default App;
