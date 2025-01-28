import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TournamentDetails.css';
import { getDocumentByPath } from '../../services/firestore.service.ts';
import { Tournament } from '../../data/models.ts';

export default function TournamentDetails() {
  const { id } = useParams<{ id: string }>();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournament = async () => {
      if (id) {
        const tournamentData = await getDocumentByPath<Tournament>(
          'tournaments',
          id
        );
        if (!!tournamentData) {
          setTournament(tournamentData);
        } else {
          navigate('tournaments');
        }
      }
    };

    fetchTournament();
  }, [id]);

  if (!tournament) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tournament-detail">
      <h1>{tournament.name}</h1>
      <p>{tournament.description}</p>
      <p>Format: {tournament.formatType}</p>
      <p>Start Date: {tournament.startDate}</p>
      <p>Status: {tournament.status}</p>
    </div>
  );
}
