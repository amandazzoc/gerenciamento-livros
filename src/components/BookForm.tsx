import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { useAppContext } from '../context/AppContext';

// Esquema de validação com Zod
const bookSchema = z.object({
  title: z
    .string()
    .min(3, 'O título do livro deve ter pelo menos 3 letras')
    .regex(/^[a-zA-Z\s]+$/, 'O título deve conter apenas letras e espaços'),
  authorId: z.string().min(1, 'Selecione um autor'),
});

// Tipos inferidos do esquema
type BookFormInputs = z.infer<typeof bookSchema>;

export const BookForm: React.FC = () => {
  const { addBook, authors } = useAppContext();

  // useForm configurado com o resolver do Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormInputs>({
    resolver: zodResolver(bookSchema),
  });

  const onSubmit = (data: BookFormInputs) => {
    addBook({ id: uuidv4(), title: data.title, authorId: data.authorId });
    reset(); // Limpa o formulário após submissão
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('title')} placeholder="Book Title" />
        {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
      </div>
      <div>
        <select {...register('authorId')}>
          <option value="">Select Author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        {errors.authorId && (
          <p style={{ color: 'red' }}>{errors.authorId.message}</p>
        )}
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};
