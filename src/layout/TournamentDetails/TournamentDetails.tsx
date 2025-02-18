import './TournamentDetails.css';

import { Table } from '@components';
import { Tournament } from '@models';
import { getTournament } from '@services';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface TournamentTableState {
  participants: [];
  isEditing: boolean;
  isLoading: boolean;
}

const initialState: TournamentTableState = {
  participants: [],
  isEditing: false,
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_EDIT_TABLE':
      return { ...state, isEditing: !state.isEditing };
    case 'ADD_PARTICIPANT':
      return { ...state, participants: [...state.participants, action.value] };
    case 'UPDATE_PARTICIPANT':
      return {
        ...state,
        participants: state.participants.map((participant, index) =>
          index === action.index
            ? { ...participant, ...action.value }
            : participant
        ),
      };
    default:
      return state;
  }
}

export default function TournamentDetails() {
  const { id } = useParams<{ id: string }>();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    () => initialState
  );

  const openTableForEdit = useCallback(() => {
    dispatch({ type: 'TOGGLE_EDIT_TABLE' });
  }, []);
  const addParticipant = useCallback(() => {
    dispatch({
      type: 'ADD_PARTICIPANT',
      value: { name: 'New Participant', score: 0 },
    });
  }, []);
  const handlePointChange = useCallback((index, value) => {
    dispatch({ type: 'UPDATE_PARTICIPANT', index, value: { score: value } });
  }, []);
  const handleNameChange = useCallback((index, value) => {
    dispatch({ type: 'UPDATE_PARTICIPANT', index, value: { name: value } });
  }, []);

  useEffect(() => {
    const fetchTournament = async () => {
      if (id) {
        const tournamentData = await getTournament(id);
        if (tournamentData) {
          setTournament(tournamentData);
        } else {
          navigate('/tournaments');
        }
      }
    };

    fetchTournament();
  }, [navigate]);

  if (!tournament || state.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tournament-detail">
      <h1>{tournament.name}</h1>
      <p>{tournament.description}</p>
      <p>Format: {tournament.formatType}</p>
      <p>Start Date: {tournament.startDate}</p>
      <p>Status: {tournament.status}</p>

      <button className="primary-button" onClick={openTableForEdit}>
        {state.isEditing ? 'Save' : 'Edit'}
      </button>

      <div className="tournament-table">
        <Table>
          <Table.Header columns={['Position', 'Title', 'Score']}></Table.Header>
          <Table.Body>
            {state.participants.map((participant, index) => (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  {state.isEditing ? (
                    <input
                      defaultValue={participant.name}
                      onBlur={(e) => handleNameChange(index, e.target.value)}
                    />
                  ) : (
                    participant.name
                  )}
                </Table.Cell>
                <Table.Cell>
                  {state.isEditing ? (
                    <input
                      defaultValue={participant.score}
                      onBlur={(e) => handlePointChange(index, e.target.value)}
                    />
                  ) : (
                    participant.score
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
            {state.isEditing && (
              <Table.Row>
                <Table.Cell>
                  <button className="primary-button" onClick={addParticipant}>
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
