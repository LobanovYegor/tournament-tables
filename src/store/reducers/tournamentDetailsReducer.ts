import { Participant, Tournament } from '@models';
import { Action } from 'src/types/types';

export interface TournamentDetailsState {
  tournament: Tournament | null;
  participants: Participant[];
  loading: boolean;
  error: string | null;
}

const initialState: TournamentDetailsState = {
  tournament: null,
  participants: [],
  loading: false,
  error: null,
};

export const tournamentDetailsReducer = (
  state: TournamentDetailsState = initialState,
  action: Action<Participant[] | Tournament>
): TournamentDetailsState => {
  switch (action.type) {
    case 'FETCH_TOURNAMENT_DETAILS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_TOURNAMENT_DETAILS_SUCCESS':
      return {
        ...state,
        tournament: action.payload as Tournament,
        loading: false,
      };
    case 'FETCH_TOURNAMENT_DETAILS_FAILURE':
      return { ...state, loading: false, error: action.payload as string };
    case 'FETCH_PARTICIPANTS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_PARTICIPANTS_SUCCESS':
      return {
        ...state,
        participants: action.payload as Participant[],
        loading: false,
      };
    case 'FETCH_PARTICIPANTS_FAILURE':
      return { ...state, loading: false, error: action.payload as string };
    default:
      return state;
  }
};
