import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Need to provide context to App.js from AuthContext.js hook (AuthContextProvider function)

import { AuthContextProvider } from './context/AuthContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);