import './TournamentsList.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Tournament } from '../../data/models.ts';
import { getCollectionByPath } from '../../services/firestore.service.ts';

export default function TournamentsList() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournaments = async () => {
      const tournamentsData =
        await getCollectionByPath<Tournament>('tournaments');
      setTournaments(tournamentsData);
    };

    fetchTournaments();
  }, []);

  const navigateToCreate = () => navigate('/tournaments/edit');

  const navigateToId = (id: string) => () => navigate(`/tournaments/details/${id}`);

  return (
    <div className="tournaments-list">
      <button className="primary-button" onClick={navigateToCreate}>
        Create table
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Format Type</th>
            <th>Start Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament) => (
            <tr key={tournament.id} onClick={navigateToId(tournament.id)}>
              <td>{tournament.name}</td>
              <td>{tournament.description}</td>
              <td>{tournament.formatType}</td>
              <td>{tournament.startDate}</td>
              <td>{tournament.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
