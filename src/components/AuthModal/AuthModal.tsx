import './AuthModal.css';

import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  logIn,
  registerUser,
  setDocumentByPath,
} from '../../services/firestore.service.ts';

interface AuthModalProps {
  isOpen: boolean;
  toggleModal: () => void;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

interface RegistrationFormInputs extends LoginFormInputs {
  confirmPassword: string;
  displayName: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, toggleModal }) => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [isPending, setIsPending] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormInputs | LoginFormInputs>();

  const onLogin: SubmitHandler<LoginFormInputs> = async (
    data: LoginFormInputs
  ) => {
    setIsPending(true);
    try {
      await logIn(data.email, data.password);
      toggleModal();
      reset();
    } catch (error) {
      console.error('Login error:', error);
    }
    setIsPending(false);
  };

  const onRegister: SubmitHandler<RegistrationFormInputs> = async (data) => {
    setIsPending(true);
    try {
      const userId = await registerUser(data.email, data.password);
      await setDocumentByPath('users', userId, {
        displayName: data.displayName,
        email: data.email,
        createdAt: new Date(),
      });

      toggleModal();
      reset();
    } catch (error) {
      console.error('Registration error:', error);
    }
    setIsPending(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') toggleModal();
    };

    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleModal]);

  if (!isOpen) return null;

  const toggleFormType = () => {
    reset();
    setIsLogin(!isLogin);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isLogin ? 'Log In' : 'Registration'}</h2>

        <button className="close-button" onClick={toggleModal}>
          <span className="material-symbols-outlined">close</span>
        </button>

        {isLogin ? (
          <form onSubmit={handleSubmit(onLogin)}>
            <div className="form-input">
              <label> Email: </label>
              <input type="text" {...register('email', { required: true })} />
              {errors?.email && <span>This field is required</span>}
            </div>

            <div className="form-input">
              <label> Password: </label>
              <input
                type="password"
                {...register('password', { required: true })}
              />
              {errors?.password && <span>This field is required</span>}
            </div>

            <button type="submit" disabled={isPending}>
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onRegister)}>
            <div className="form-input">
              <label> Email: </label>
              <input type="text" {...register('email', { required: true })} />
              {errors?.email && <span>This field is required</span>}
            </div>

            <div className="form-input">
              <label> Password: </label>
              <input
                type="password"
                {...register('password', { required: true })}
              />
              {errors?.password && <span>This field is required</span>}
            </div>

            <div className="form-input">
              <label> Confirm password: </label>
              <input
                type="password"
                {...register('confirmPassword', { required: true })}
              />
              {errors?.confirmPassword && <span>This field is required</span>}
            </div>

            <div className="form-input">
              <label> User name: </label>
              <input
                type="text"
                {...register('displayName', { required: true })}
              />
              {errors?.displayName && <span>This field is required</span>}
            </div>

            <button type="submit" disabled={isPending}>
              Register
            </button>
          </form>
        )}

        {isLogin ? (
          <p>
            Don't have an account? <a onClick={toggleFormType}>Create it!</a>
          </p>
        ) : (
          <p>
            Already have account? <a onClick={toggleFormType}>Log in!</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
