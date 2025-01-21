import { Link } from 'react-router-dom';
import './Header.css';
import React, { useState } from "react";

import AuthModal from "../AuthModal/AuthModal.tsx";
import { useAuth } from "../../services/AuthContext.tsx";
import {auth} from "../../firebase.ts";
import { signOut } from "firebase/auth";



export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useAuth();

  const toggleModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>
      <div className="controls">
        <a>About</a>
        <a>Support</a>
        {user ? (<>
          <span className="user-name">{user.displayName}</span>
          <span className="material-symbols-outlined link-text" onClick={handleLogout}>
            logout
          </span>
        </>) : (<>
          <button className="login-button" onClick={toggleModal}>Login</button>
          <AuthModal
            isOpen={isLoginModalOpen}
            toggleModal={toggleModal}
            shouldCloseOnOverlayClick={true}
          />
        </>)}
      </div>
    </header>
  );
};
