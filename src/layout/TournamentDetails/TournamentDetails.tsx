import { Button, Table } from '@components';
import { UnknownAction } from '@reduxjs/toolkit';
import { addParticipant } from '@services';
import { RootState } from '@store';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchTournamentDetails,
  fetchTournamentParticipants,
} from 'src/store/actions/tournamentDetailsActions.ts';

export default function TournamentDetails() {
  const { id } = useParams<{ id: string }>();
  const { tournament, participants, loading, error } = useSelector(
    (state: RootState) => state.tournamentDetails
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddParticipant = useCallback(() => {
    addParticipant(id as string, { name: 'New Participant', score: 0 });
    dispatch(
      fetchTournamentParticipants(id as string) as unknown as UnknownAction
    );
  }, [id, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchTournamentDetails(id) as unknown as UnknownAction);
      dispatch(fetchTournamentParticipants(id) as unknown as UnknownAction);
    } else {
      navigate('/tournaments');
    }
  }, [dispatch, id, navigate]);

  if (loading || tournament?.id !== id) return <div>Loading...</div>;
  if (error || !tournament) return <div>Error loading details</div>;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex justify-between items-start">
        <div>
          <h1>{tournament.name}</h1>
          <p>{tournament.description}</p>
        </div>

        <Button onClick={handleAddParticipant}>Add Participant</Button>
      </div>

      <Table className="w-full rounded overflow-hidden mt-4">
        <Table.Header columns={['P.', 'Title', 'Score']} />
        <Table.Body>
          {participants.map((participant, index) => (
            <Table.Row
              key={index}
              className="odd:bg-primary-100 bg-primary-50 hover:bg-primary-200"
            >
              <Table.Cell className="w-10 px-2 py-1">{index + 1}</Table.Cell>
              <Table.Cell className="px-2 py-1">{participant.name}</Table.Cell>
              <Table.Cell className="px-2 py-1 text-right">
                {participant.score}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
