import { Button, InputField, Modal } from '@components';
import { Tournament } from '@models';
import { UnknownAction } from '@reduxjs/toolkit';
import { createTournament } from '@services';
import { fetchTournaments } from '@store';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

interface CreateTournamentModalProps {
  isOpen: boolean;
  toggleModal: () => void;
}

interface CreateTournamentForm {
  name: string;
  description: string;
  formatType: string;
  startDate: string;
  status: string;
}

export function CreateTournamentModal({
  isOpen,
  toggleModal,
}: CreateTournamentModalProps) {
  const methods = useForm<CreateTournamentForm>();
  const dispatch = useDispatch();

  const onCreateTable: SubmitHandler<CreateTournamentForm> = async (data) => {
    try {
      await createTournament(data as Tournament);
      toggleModal();
      methods.reset();
      dispatch(fetchTournaments() as unknown as UnknownAction);
    } catch (error) {
      console.error('Create tournament error:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => toggleModal()}>
      <h3>Create New Tournament</h3>

      <FormProvider {...methods}>
        <form
          className="min-w-md"
          onSubmit={methods.handleSubmit(onCreateTable)}
        >
          <InputField name="name" label="Name" type="text" required />
          <InputField name="description" label="Description" type="text" />
          <InputField name="formaType" label="Format Type" type="text" />
          <InputField name="startDate" label="Date of Start" type="date" />
          <InputField name="status" label="Status" type="text" />

          <Button type="submit">Create</Button>
        </form>
      </FormProvider>
    </Modal>
  );
}
