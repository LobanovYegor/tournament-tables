import './App.css';
import { db } from './firebase';
import { Route, Routes } from 'react-router-dom';

import HomePage from './layout/HomePage.tsx';
import LoginPage from './layout/LoginPage.tsx';
import RegistrationPage from "./layout/RegistrationPage.tsx";

async function App() {
  console.log('Firestore instance:', db);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;
