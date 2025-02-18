import './index.css';

import { AuthProvider } from '@contexts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.tsx';
import store from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
