import './TournamentEdit.css';

import { Tournament } from '@models';
import { createTournament, getTournament, updateTournament } from '@services';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

interface TournamentFormInputs {
  name: string;
  description: string;
  formatType: string;
  startDate: string;
  status: string;
}

export default function TournamentEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TournamentFormInputs>();

  useEffect(() => {
    const fetchTournament = async () => {
      if (id) {
        const tournamentData = await getTournament(id);
        if (tournamentData) {
          reset({
            name: tournamentData.name,
            description: tournamentData.description,
            formatType: tournamentData.formatType,
            // TODO: Update date usage!
            startDate: new Date(tournamentData.startDate)
              .toISOString()
              .split('T')[0],
            status: tournamentData.status,
          });
        } else {
          navigate('/tournaments');
        }
      }
    };

    fetchTournament();
  }, [reset, navigate]);

  const onSaveTournamentForm = async (data: TournamentFormInputs) => {
    try {
      if (id) {
        await updateTournament(id, data as Tournament);
      } else {
        await createTournament(data as Tournament);
      }
      navigate('/tournaments');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="tournament-edit">
      <h1>Edit Tournament</h1>
      <form onSubmit={handleSubmit(onSaveTournamentForm)}>
        <div className="form-input">
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            name="name"
            type="text"
            {...register('name', { required: true })}
          />
          {errors?.name && <span>This field is required</span>}
        </div>

        <div className="form-input">
          <label htmlFor="description">Description: </label>
          <input
            id="description"
            name="description"
            type="text"
            {...register('description', { required: true })}
          />
          {errors?.description && <span>This field is required</span>}
        </div>

        <div className="form-input">
          <label htmlFor="formatType">Format Type: </label>
          <select
            id="formatType"
            name="formatType"
            {...register('formatType', { required: true })}
          >
            <option value="singleElimination">Single Elimination</option>
            <option value="doubleElimination">Double Elimination</option>
            <option value="roundRobin">Round Robin</option>
          </select>
        </div>

        <div className="form-input">
          <label htmlFor="startDate">Start Date: </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            {...register('startDate', { required: true })}
          />
        </div>

        <div className="form-input">
          <label htmlFor="status">Status: </label>
          <select
            id="status"
            name="status"
            {...register('status', { required: true })}
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button className="primary-button" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
