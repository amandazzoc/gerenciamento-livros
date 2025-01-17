import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { useAppContext } from '../context/AppContext';

// Esquema de validação com Zod
const authorSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
});
// Tipos inferidos do esquema
type AuthorFormInputs = z.infer<typeof authorSchema>;

export const AuthorForm: React.FC = () => {
  const { addAuthor } = useAppContext();

  // useForm configurado com o resolver do Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthorFormInputs>({
    resolver: zodResolver(authorSchema),
  });

  const onSubmit = (data: AuthorFormInputs) => {
    addAuthor({ id: uuidv4(), name: data.name });
    reset(); // Limpa o formulário após submissão
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('name')} placeholder="Author Name" />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>
      <button type="submit">Add Author</button>
    </form>
  );
};
