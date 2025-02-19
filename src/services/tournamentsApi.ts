import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  createTournament,
  deleteTournament,
  getTournament,
  getTournaments,
  updateTournament,
} from './tournament.service.ts';

export const tournamentsApi = createApi({
  reducerPath: 'tournaments',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Tournaments'],
  endpoints: (builder) => ({
    getTournaments: builder.query({
      async queryFn() {
        try {
          const data = getTournaments();
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Tournaments'],
    }),
    getTournament: builder.query({
      async queryFn(id) {
        try {
          const data = await getTournament(id);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Tournaments'],
    }),
    createTournament: builder.mutation({
      async queryFn(data) {
        try {
          await createTournament(data);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Tournaments'],
    }),
    updateTournament: builder.mutation({
      async queryFn({ id, data }) {
        try {
          await updateTournament(id, data);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Tournaments'],
    }),
    deleteTournament: builder.mutation({
      async queryFn(id) {
        try {
          await deleteTournament(id);
          return { data: id };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Tournaments'],
    }),
  }),
});

export const {
  useGetTournamentsQuery,
  useGetTournamentQuery,
  useCreateTournamentMutation,
  useUpdateTournamentMutation,
  useDeleteTournamentMutation,
} = tournamentsApi;
