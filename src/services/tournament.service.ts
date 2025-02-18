import { Tournament } from '@models';

import {
  addDocumentByPath,
  deleteDocumentByPath,
  getDocumentByPath,
  updateDocumentByPath,
} from './firestore.service.ts';

export const getTournament = async (id: string): Promise<Tournament | null> => {
  return await getDocumentByPath('tournaments', id);
};

export const createTournament = async (data: Tournament): Promise<void> => {
  await addDocumentByPath('tournaments', {
    ...data,
    startDate: new Date(data.startDate).toISOString(),
  });
};

export const updateTournament = async (
  id: string,
  data: Tournament
): Promise<void> => {
  await updateDocumentByPath('tournaments', id, {
    ...data,
    startDate: new Date(data.startDate).toISOString(),
  });
};

export const deleteTournament = async (id: string): Promise<void> => {
  await deleteDocumentByPath('tournaments', id);
};
