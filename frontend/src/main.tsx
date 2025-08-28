import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter } from 'react-router';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import store from './store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Provide the Redux store to the application */}
    <Provider store={store}> 
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right', // Position of the snackbar on the screen
        }}
        maxSnack={1} // Maximum number of snackbars to display at once
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  </StrictMode>
);
