import { Button, Dialog, Flex, TextField } from '@radix-ui/themes';
import { DataList } from '../components/DataList';
import { useAppContext } from '../context/AppContext';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';


export const BooksPage: React.FC = () => {
  const { books, addBook, authors, deleteBook } = useAppContext();
  const [isModalOpen, setModalOpen] = useState(false);

  const bookSchema = z.object({
    title: z
      .string()
      .min(3, 'O título do livro deve ter pelo menos 3 letras'),
    authorId: z.string().min(1, 'Selecione um autor'),
  });

  type BookFormInputs = z.infer<typeof bookSchema>;

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
    setModalOpen(false); // Fecha o modal apenas se os dados forem válidos
  };

  const isFormValid = !errors.title && !errors.authorId;

  const renderItemDetails = (book: {
    id: string;
    title: string;
    authorId: string;
  }) => {
    const author = authors.find((author) => author.id === book.authorId);
    return {
      Título: book.title,
      Autor: author ? author.name : 'Desconhecido',
    };
  };

  return (
    <div className="page">
      <div className="content">
        <div className="header">
          <Dialog.Root open={isModalOpen} onOpenChange={setModalOpen}>
            <Dialog.Trigger>
              <Button
                color="indigo"
                variant="surface"
                onClick={() => setModalOpen(true)}
              >
                <Plus /> Novo Livro
              </Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Cadastrar Livro</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Preencha os campos abaixo para cadastrar um novo livro.
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Flex direction="column" gap="3">
                    <label>
                      <p>Titulo</p>
                      <TextField.Root
                        {...register('title')}
                        placeholder="Titulo do Livro"
                        aria-invalid={!!errors.title}
                      ></TextField.Root>
                      {errors.title && (
                        <p style={{ color: 'red' }}>{errors.title.message}</p>
                      )}
                    </label>
                    <label>
                      <p>Autor</p>
                      <select
                        {...register('authorId')}
                        className="styled-select"
                      >
                        <option value="">Select Author</option>
                        {authors.map((author) => (
                          <option key={author.id} value={author.id}>
                            {author.name}
                          </option>
                        ))}
                      </select>
                      {errors.authorId && (
                        <p style={{ color: 'red' }}>
                          {errors.authorId.message}
                        </p>
                      )}
                    </label>
                  </Flex>
                  <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                      <Button variant="soft" color="gray">
                        Cancelar
                      </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                      <Button type="submit" disabled={!isFormValid}>
                        Salvar
                      </Button>
                    </Dialog.Close>
                  </Flex>
                </form>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </div>

        <DataList
          data={books}
          columns={[
            { header: 'Livro', accessor: 'title' },
            {
              header: 'Autor',
              accessor: (book) =>
                authors.find((author) => author.id === book.authorId)?.name ||
                'Unknown',
            },
          ]}
          onDelete={deleteBook}
          renderItemDetails={renderItemDetails}
        />
      </div>
    </div>
  );
}
  
  
