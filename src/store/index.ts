import { configureStore } from '@reduxjs/toolkit';

import { tournamentsApi } from '../services/tournamentsApi.ts';
import tournamentReducer from './tournamentSlice.ts';

export const store = configureStore({
  reducer: {
    [tournamentsApi.reducerPath]: tournamentsApi.reducer,
    tournament: tournamentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tournamentsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
