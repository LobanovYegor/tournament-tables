import { Tournament, TournamentParticipant } from '@models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TournamentState {
  tournament: Tournament | null;
  participants: TournamentParticipant[];
  isLoading: boolean;
  isEditing: boolean;
}

const initialState: TournamentState = {
  tournament: null,
  participants: [],
  isLoading: false,
  isEditing: false,
};

const tournamentSlice = createSlice({
  initialState,
  name: 'tournament',
  reducers: {
    setTournaments(state, action: PayloadAction<Tournament>) {
      state.tournament = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    toggleEditing(state) {
      state.isEditing = !state.isEditing;
    },
    addParticipant(state, action: PayloadAction<TournamentParticipant>) {
      state.participants.push(action.payload);
    },
    updateParticipant(
      state,
      action: PayloadAction<{
        index: number;
        data: Partial<TournamentParticipant>;
      }>
    ) {
      const { index, data } = action.payload;
      state.participants[index] = { ...state.participants[index], ...data };
    },
  },
});

export const {
  setTournaments,
  setLoading,
  toggleEditing,
  addParticipant,
  updateParticipant,
} = tournamentSlice.actions;
export default tournamentSlice.reducer;
