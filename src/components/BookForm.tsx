import { useForm } from 'react-hook-form';
import { useAppContext } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';

interface BookFormInputs {
  title: string;
  authorId: string;
}

export const BookForm: React.FC = () => {
  const { addBook, authors } = useAppContext();
  const { register, handleSubmit, reset } = useForm<BookFormInputs>();

  const onSubmit = (data: BookFormInputs) => {
    addBook({ id: uuidv4(), title: data.title, authorId: data.authorId });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('title', { required: true })}
        placeholder="Book Title"
      />
      <select {...register('authorId', { required: true })}>
        <option value="">Select Author</option>
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Book</button>
    </form>
  );
};
