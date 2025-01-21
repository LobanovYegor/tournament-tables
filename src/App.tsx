import './App.css';
import { db } from './firebase';
import Header from "./components/Header/Header.tsx";
import AuthModal from "./components/AuthModal/AuthModal.tsx";
import HomePage from "./layout/HomePage.tsx";

function App() {
  console.log('Firestore instance:', db);

  return (
    <div className="main-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="view-container">
        <HomePage />
      </div>
      <div className="footer-container">
        &copy; 2025
      </div>
    </div>
  );
}

export default App;
