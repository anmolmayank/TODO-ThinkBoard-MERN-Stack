import { lazy, Suspense } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router';

const HomePage = lazy(() => import('./pages/HomePage'));
const CreatePage = lazy(() => import('./pages/CreatePage'));
const NoteDetailPage = lazy(() => import('./pages/NoteDetailPage'));

function App() {
  return (
    <div className="main-container">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
