import './TournamentDetails.css';

import { Table } from '@components';
import { Tournament } from '@models';
import { useParams } from 'react-router-dom';
import { useGetTournamentQuery } from 'src/services/tournamentsApi.ts';

import { toggleEditing } from '../../store/tournamentSlice.ts';

export default function TournamentDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetTournamentQuery({ id });
  const tournament = data as Tournament;

  // useEffect(() => {
  //   if (id) {
  //     dispatch(getTournament(id) as unknown as AnyAction)
  //       .then(unwrapResult)
  //       .catch(() => {
  //         navigate('/tournaments');
  //       });
  //   }
  // }, [id, dispatch, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tournaments</div>;

  // const handlePointChange = (index: number, value: number) => {
  //   dispatch(updateParticipant({ index, data: { score: value } }));
  // };

  // const handleNameChange = (index: number, value: string) => {
  //   dispatch(updateParticipant({ index, data: { name: value } }));
  // };

  // const handleAddParticipant = () => {
  //   dispatch(addParticipant({ score: 0, name: 'New Participant' }));
  // };

  return (
    <div className="tournament-detail">
      <h1>{tournament.name}</h1>
      <p>{tournament.description}</p>
      <p>Format: {tournament.formatType}</p>
      <p>Start Date: {tournament.startDate}</p>
      <p>Status: {tournament.status}</p>

      <button
        className="primary-button"
        onClick={() => dispatch(toggleEditing())}
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>

      <div className="tournament-table">
        <Table>
          <Table.Header columns={['Position', 'Title', 'Score']} />
          <Table.Body>
            {participants.map((participant, index) => (
              <Table.Row key={index} className="tournament-row">
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  {isEditing ? (
                    <input
                      defaultValue={participant.name}
                      onBlur={(e) => handleNameChange(index, e.target.value)}
                    />
                  ) : (
                    participant.name
                  )}
                </Table.Cell>
                <Table.Cell>
                  {isEditing ? (
                    <input
                      type="number"
                      defaultValue={participant.score}
                      onBlur={(e) =>
                        handlePointChange(index, Number(e.target.value))
                      }
                    />
                  ) : (
                    participant.score
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
            {isEditing && (
              <Table.Row>
                <Table.Cell colSpan={3} style={{ textAlign: 'center' }}>
                  <button
                    className="primary-button"
                    onClick={handleAddParticipant}
                  >
                    Add participant
                  </button>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
