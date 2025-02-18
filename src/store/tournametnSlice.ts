import { Tournament, TournamentParticipant } from '@models';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getTournament } from '@services';

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

export const fetchTournament = createAsyncThunk<
  Tournament,
  string,
  { rejectValue: string }
>('tournament/fetchTournament', async (id: string, { rejectWithValue }) => {
  try {
    const response = await getTournament(id);
    if (!response) {
      return rejectWithValue('Tournament not found');
    }
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

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
  extraReducers: (builder: ActionReducerMapBuilder<TournamentState>) => {
    builder
      .addCase(fetchTournament.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchTournament.fulfilled,
        (state, action: PayloadAction<Tournament>) => {
          state.isLoading = false;
          state.tournament = action.payload;
        }
      )
      .addCase(fetchTournament.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.payload);
      });
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
