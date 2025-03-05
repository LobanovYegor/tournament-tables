import { Tournament } from '@models';
import { getTournaments } from '@services';
import { Dispatch } from 'redux';
import { Action } from 'src/types/types';

export const fetchTournaments =
  () => async (dispatch: Dispatch<Action<Tournament[]>>) => {
    dispatch({ type: 'FETCH_TOURNAMENTS_REQUEST' });
    try {
      const tournaments: Tournament[] = await getTournaments();
      dispatch({ type: 'FETCH_TOURNAMENTS_SUCCESS', payload: tournaments });
    } catch (error) {
      dispatch({
        type: 'FETCH_TOURNAMENTS_FAILURE',
        payload:
          error instanceof Error
            ? error.message
            : 'Failed to fetch tournaments',
      });
    }
  };
