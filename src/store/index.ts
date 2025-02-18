import { configureStore } from '@reduxjs/toolkit';

import tournamentReducer from './tournametnSlice';

const store = configureStore({
  reducer: {
    tournament: tournamentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
