import './TournamentsList.css';

import { Table } from '@components';
import { Tournament } from '@models';
import { MouseEvent as ReactMouseEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetTournamentsQuery } from '../../services/tournamentsApi.ts';

export default function TournamentsList() {
  const { data, error, isLoading } = useGetTournamentsQuery({});
  const navigate = useNavigate();

  const navigateToCreate = useCallback(
    () => navigate('/tournaments/edit'),
    [navigate]
  );

  const navigateToId = useCallback(
    (id: string) => () => {
      navigate(`/tournaments/details/${id}`);
    },
    [navigate]
  );

  const handleEdit = useCallback(
    (id: string) => (event: ReactMouseEvent) => {
      event.stopPropagation();
      navigate(`/tournaments/edit/${id}`);
    },
    [navigate]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tournaments</div>;

  return (
    <div className="tournaments-list">
      <button className="primary-button" onClick={navigateToCreate}>
        Create table
      </button>

      <Table>
        <Table.Header
          columns={['Name', 'Type', 'Date', 'Status', '']}
        ></Table.Header>
        <Table.Body>
          {((data as Tournament[]) || []).map((tournament: Tournament) => (
            <Table.Row
              key={tournament.id}
              onClick={navigateToId(tournament.id)}
            >
              <Table.Cell>{tournament.name}</Table.Cell>
              <Table.Cell>{tournament.formatType}</Table.Cell>
              <Table.Cell>{tournament.startDate}</Table.Cell>
              <Table.Cell>{tournament.status}</Table.Cell>
              <Table.Cell>
                <button
                  className="primary-button"
                  onClick={handleEdit(tournament.id)}
                >
                  EDIT
                </button>
                <button className="primary-button">DELETE</button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
