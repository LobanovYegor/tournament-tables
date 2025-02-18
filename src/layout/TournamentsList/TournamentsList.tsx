import './TournamentsList.css';

import { Table } from '@components';
import { Tournament } from '@models';
import { deleteTournament, getCollectionByPath } from '@services';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TournamentsList() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const navigate = useNavigate();

  const fetchTournaments = useCallback(async () => {
    const tournamentsData =
      await getCollectionByPath<Tournament>('tournaments');
    setTournaments(tournamentsData);
  }, []);

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
    (id: string) => (event) => {
      event.stopPropagation();
      navigate(`/tournaments/edit/${id}`);
    },
    [navigate]
  );

  const handleDelete = useCallback(
    (id: string) => async (event) => {
      event.stopPropagation();
      await deleteTournament(id);
      await fetchTournaments();
    },
    [fetchTournaments]
  );

  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

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
          {tournaments.map((tournament) => (
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
                <button
                  className="primary-button"
                  onClick={handleDelete(tournament.id)}
                >
                  DELETE
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
