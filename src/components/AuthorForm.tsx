import { useForm } from 'react-hook-form';
import { useAppContext } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';

interface AuthorFormInputs {
  name: string;
}

export const AuthorForm: React.FC = () => {
  const { addAuthor } = useAppContext();
  const { register, handleSubmit, reset } = useForm<AuthorFormInputs>();

  const onSubmit = (data: AuthorFormInputs) => {
    addAuthor({ id: uuidv4(), name: data.name });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name', { required: true })}
        placeholder="Author Name"
      />
      <button type="submit">Add Author</button>
    </form>
  );
};
