import './TournamentEdit.css';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { addDocumentByPath } from '../../services/firestore.service.ts';

interface TournamentFormInputs {
  name: string;
  description: string;
  formatType: string;
  startDate: string;
  status: string;
}

export default function TournamentEdit() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TournamentFormInputs>();

  const onSaveTournamentForm = async (data: TournamentFormInputs) => {
    try {
      await addDocumentByPath('tournaments', {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
      });
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
