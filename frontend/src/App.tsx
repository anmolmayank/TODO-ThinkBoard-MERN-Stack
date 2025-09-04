import { lazy, Suspense, useEffect, type JSX } from 'react';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import { fetchRefreshToken } from './store/thunks/fetchAuthOps';
import { useAppDispatch } from './hooks/storeHooks';

const HomePage = lazy(() => import('./pages/HomePage'));
const CreatePage = lazy(() => import('./pages/CreatePage'));
const NoteDetailPage = lazy(() => import('./pages/NoteDetailPage'));
const RegistrationPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const token = localStorage.getItem('accessToken');
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated) || !!token;
  return isAuth ? children : <Navigate to="/login" />;
}

function App() {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem('accessToken');

  // On reload: try refresh if we have a refresh token
  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      dispatch(fetchRefreshToken());
    }
  }, [dispatch, accessToken]);

  return (
    <div className="main-container">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/HomePage"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/note/:id"
            element={
              <PrivateRoute>
                <NoteDetailPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
