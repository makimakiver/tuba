import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './state/AuthContext';
import { useParams } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
// the root is connected to the root component in the index html
root.render(
  <React.StrictMode> 
    {/* ^ strict-mode will output the warning when there is an error. */}
    {/* v  App shows the app component in the other file. */}
    <AuthContextProvider>
      <App /> 
    </AuthContextProvider>
  </React.StrictMode>
);


