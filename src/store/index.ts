import { configureStore } from '@reduxjs/toolkit';

import {
  authReducer,
  tournamentDetailsReducer,
  tournamentsReducer,
} from './reducers';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tournaments: tournamentsReducer,
    tournamentDetails: tournamentDetailsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './actions';
