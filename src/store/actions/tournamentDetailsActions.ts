import { Participant, Tournament } from '@models';
import { getParticipants, getTournament } from '@services';
import { Dispatch } from 'redux';
import { Action } from 'src/types/types';

export const fetchTournamentDetails =
  (id: string) => async (dispatch: Dispatch<Action<Tournament>>) => {
    dispatch({ type: 'FETCH_TOURNAMENT_DETAILS_REQUEST' });
    try {
      const tournament: Tournament = (await getTournament(id)) as Tournament;
      dispatch({
        type: 'FETCH_TOURNAMENT_DETAILS_SUCCESS',
        payload: tournament,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_TOURNAMENT_DETAILS_FAILURE',
        payload:
          error instanceof Error
            ? error.message
            : 'Failed to fetch tournament details',
      });
    }
  };

export const fetchTournamentParticipants =
  (id: string) => async (dispatch: Dispatch<Action<Participant[]>>) => {
    dispatch({ type: 'FETCH_PARTICIPANTS_REQUEST' });
    try {
      const participants: Participant[] = await getParticipants(id);
      dispatch({ type: 'FETCH_PARTICIPANTS_SUCCESS', payload: participants });
    } catch (error) {
      dispatch({
        type: 'FETCH_PARTICIPANTS_FAILURE',
        payload:
          error instanceof Error
            ? error.message
            : 'Failed to fetch participants',
      });
    }
  };
