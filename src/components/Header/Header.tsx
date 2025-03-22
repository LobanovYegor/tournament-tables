import { AuthModal, Button } from '@components';
import { useAuth } from '@hooks';
import { logOut } from '@services';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <header className="flex justify-between items-center px-6 h-16">
      <div>
        <Link to="/">Logo</Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link to="/tournaments">Current tournaments</Link>
        <a>Support</a>
        {user ? (
          <>
            <span className="font-bold">{user.displayName}</span>
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
      <AuthModal isOpen={isLoginModalOpen} onClose={toggleModal} />
    </header>
  );
}
