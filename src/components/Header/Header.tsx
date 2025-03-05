import './Header.css';

import { AuthModal, Button } from '@components';
import { useAuth } from '@hooks';
import { logOut } from '@services';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useAuth();

  const toggleModal = () => {
    console.log('toggleModal');
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
            <Button onClick={toggleModal}>Login</Button>
          </>
        )}
      </div>
      <AuthModal
        isOpen={isLoginModalOpen}
        toggleModal={toggleModal}
        shouldCloseOnOverlayClick={true}
      />
    </header>
  );
}
