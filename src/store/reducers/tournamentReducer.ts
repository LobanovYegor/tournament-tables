import { Tournament } from '@models';
import { Action } from 'src/types/types';

export interface TournamentsState {
  list: Tournament[];
  loading: boolean;
  error: string | null;
}

const initialState: TournamentsState = {
  list: [],
  loading: false,
  error: null,
};

export const tournamentsReducer = (
  state: TournamentsState = initialState,
  action: Action<Tournament[]>
): TournamentsState => {
  switch (action.type) {
    case 'FETCH_TOURNAMENTS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_TOURNAMENTS_SUCCESS':
      return { ...state, list: action.payload as Tournament[], loading: false };
    case 'FETCH_TOURNAMENTS_FAILURE':
      return { ...state, loading: false, error: action.payload as string };
    default:
      return state;
  }
};
