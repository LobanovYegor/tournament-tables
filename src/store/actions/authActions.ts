import { UserData } from '@models';
import { logIn } from '@services';
import { Action, Dispatch } from 'redux';

export const loginAction =
  (credentials: { email: string; password: string }) =>
  async (dispatch: Dispatch<Action>) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const user: UserData = (await logIn(credentials)) as UserData;
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error instanceof Error ? error.message : 'Login failed',
      });
    }
  };
