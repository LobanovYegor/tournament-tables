import './App.css';
import { db } from './firebase';
import { Route, Routes } from 'react-router-dom';

import HomePage from './layout/HomePage.tsx';
import LoginPage from './layout/LoginPage.tsx';

function App() {
  console.log('Firestore instance:', db);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
