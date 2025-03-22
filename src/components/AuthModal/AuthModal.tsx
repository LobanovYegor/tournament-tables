import { InputField, Modal } from '@components';
import { UserData } from '@models';
import { UnknownAction } from '@reduxjs/toolkit';
import { registerUser } from '@services';
import { loginAction, RootState } from '@store';
import { FC, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import illustration from '../../assets/tournament-win-illustration.jpeg';
import { Button } from '../Button/Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

interface RegistrationFormInputs extends LoginFormInputs {
  confirmPassword: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
}

export const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const methods = useForm<RegistrationFormInputs & LoginFormInputs>();

  const onLogin: SubmitHandler<LoginFormInputs> = async (
    data: LoginFormInputs
  ) => {
    dispatch(loginAction(data) as unknown as UnknownAction);
    onClose();
    methods.reset();
  };

  const onRegister: SubmitHandler<RegistrationFormInputs> = async (data) => {
    try {
      await registerUser(data, {
        email: data.email,
        displayName: data.displayName,
      } as UserData);

      onClose();
      methods.reset();
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleFormType = () => {
    methods.reset();
    setIsLogin(!isLogin);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <div className="flex items-center max-w-2xl">
        <img
          className="-ml-6 max-w-1/2"
          src={illustration}
          alt="Illustration"
        />

        <div className="flex-1">
          {isLogin ? (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onLogin)}>
                <InputField name="email" label="Email" type="text" required />
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  required
                />

                <Button className="w-full" type="submit" loading={loading}>
                  Login
                </Button>
              </form>

              <p>
                Don't have an account?{' '}
                <a onClick={toggleFormType}>Create it!</a>
              </p>
            </FormProvider>
          ) : (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onRegister)}>
                <InputField name="email" label="Email" type="text" required />
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  required
                />
                <InputField
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  required
                />
                <InputField
                  name="displayName"
                  label="Nickname"
                  type="text"
                  required
                />
                <InputField name="firstName" label="First name" type="text" />
                <InputField name="lastName" label="Last name" type="text" />

                <Button className="w-full" type="submit" loading={loading}>
                  Register
                </Button>
              </form>

              <p>
                Already have account? <a onClick={toggleFormType}>Log in!</a>
              </p>
            </FormProvider>
          )}
        </div>
      </div>
    </Modal>
  );
};
