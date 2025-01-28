import './Header.css';

import { useAuth } from '@contexts';
import { logOut } from '@services';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthModal from '../AuthModal/AuthModal.tsx';

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useAuth();

  const toggleModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>
      <div className="controls">
        <Link to="/tournaments">Current tournaments</Link>
        <a>Support</a>
        {user ? (
          <>
            <span className="user-name">{user.displayName}</span>
            <span
              className="material-symbols-outlined link-text"
              onClick={handleLogout}
            >
              logout
            </span>
          </>
        ) : (
          <>
            <button className="login-button" onClick={toggleModal}>
              Login
            </button>
            <AuthModal isOpen={isLoginModalOpen} toggleModal={toggleModal} />
          </>
        )}
      </div>
    </header>
  );
}
