import { Tournament } from '@models';

import {
  addDocumentByPath,
  deleteDocumentByPath,
  getCollectionByPath,
  getDocumentByPath,
  updateDocumentByPath,
} from './firestore.service.ts';

export const getTournaments = async (): Promise<Tournament[]> => {
  return await getCollectionByPath<Tournament>('tournaments');
};

export const getTournament = async (id: string): Promise<Tournament | null> => {
  return await getDocumentByPath('tournaments', id);
};

export const createTournament = async (data: Tournament): Promise<void> => {
  await addDocumentByPath('tournaments', {
    ...data,
    startDate: data.startDate
      ? new Date(data.startDate).toISOString()
      : undefined,
  });
};

export const updateTournament = async (
  id: string,
  data: Partial<Tournament>
): Promise<void> => {
  await updateDocumentByPath('tournaments', id, {
    ...data,
    startDate: data.startDate
      ? new Date(data.startDate).toISOString()
      : undefined,
  });
};

export const deleteTournament = async (id: string): Promise<void> => {
  await deleteDocumentByPath('tournaments', id);
};
