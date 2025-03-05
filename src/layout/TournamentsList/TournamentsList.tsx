import { Button, CreateTournamentModal } from '@components';
import { Tournament } from '@models';
import { UnknownAction } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { format, parseISO } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTournaments } from 'src/store/actions/tournamentActions';

export default function TournamentsList() {
  const { list, loading, error } = useSelector(
    (state: RootState) => state.tournaments
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTournaments() as unknown as UnknownAction);
  }, [dispatch]);

  const navigateToId = useCallback(
    (id: string) => () => {
      navigate(`/tournaments/details/${id}`);
    },
    [navigate]
  );

  const toggleCreateModal = () => {
    console.log('toggleModal');
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading tournaments</div>;

  return (
    <div className="mx-auto max-w-4xl">
      <Button onClick={toggleCreateModal}>Create tournament</Button>

      <div className="mt-4 px-4 py-2 bg-primary-50 rounded">
        <div className="flex gap-4 items-center px-4 py-2">
          <div className="flex-1">Name</div>
          <div className="min-w-24">Type</div>
          <div className="min-w-24">Date</div>
          <div className="min-w-24">Status</div>
        </div>
        {((list as Tournament[]) || []).map((tournament: Tournament) => (
          <TournamentsListItem
            key={tournament.id}
            itemData={tournament}
            onClick={navigateToId(tournament.id)}
          />
        ))}
      </div>

      <CreateTournamentModal
        isOpen={isCreateModalOpen}
        toggleModal={toggleCreateModal}
      />
    </div>
  );
}
function TournamentsListItem({
  itemData,
  onClick,
}: {
  itemData: Tournament;
  onClick: () => void;
}) {
  return (
    <div
      className="flex gap-4 items-center border-b-primary-500 border-b last:border-b-0 px-4 py-2 hover:bg-primary-100 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex-1 flex flex-col">
        <span className="font-medium">{itemData.name}</span>
        <span className="">{itemData.description}</span>
      </div>

      <div className="min-w-24">{itemData.formatType}</div>

      <div className="min-w-24">
        {format(parseISO(itemData.startDate), 'dd.MM.yyyy')}
      </div>

      <div className="min-w-24">{itemData.status}</div>
    </div>
  );
}
