import './index.css'
import App from './app'
import store from './store/store';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeProvider';

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);