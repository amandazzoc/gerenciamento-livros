import { Button, Dialog, Flex, TextField } from '@radix-ui/themes';
import { DataList } from '../components/DataList';
import { Plus } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { useAppContext } from '../hooks/useAppContext';
import { useState } from 'react';
import { EditModal } from '../components/EditModal';

export const BooksPage: React.FC = () => {
  const { books, addBook, authors, deleteBook, updateBook } = useAppContext();

  const bookSchema = z.object({
    title: z.string().min(3, 'O título do livro deve ter pelo menos 3 letras'),
    authorId: z.string().min(1, 'Selecione um autor'),
  });

  type BookFormInputs = z.infer<typeof bookSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormInputs>({
    resolver: zodResolver(bookSchema),
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  type BookWithId = BookFormInputs & { id: string };
  const [currentBook, setCurrentBook] = useState<BookWithId | null>(null);

  const onSubmit = (data: BookFormInputs) => {
    addBook({ id: uuidv4(), title: data.title, authorId: data.authorId });
    reset();
  };

  const isFormValid = !errors.title && !errors.authorId;

  const handleEdit = (book: {
    id: string;
    title: string;
    authorId: string;
  }) => {
    setCurrentBook(book);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (updatedData: BookFormInputs) => {
    if (currentBook) {
      updateBook({
        id: currentBook.id,
        ...updatedData,
      });
    }
    setIsEditModalOpen(false);
    setCurrentBook(null);
  };

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
    <>
        <div className="header">
          <Dialog.Root>
            <Dialog.Trigger>
              <Button color="indigo" variant="surface">
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
                      <p>Título</p>
                      <TextField.Root
                        {...register('title')}
                        placeholder="Título do Livro"
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
                        <option value="">Selecione um autor</option>
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
                'Desconhecido',
            },
          ]}
          onDelete={deleteBook}
          onEdit={handleEdit} // Passa o método de edição para DataList
          renderItemDetails={renderItemDetails}
        />

        {currentBook && (
          <EditModal<BookFormInputs>
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onEdit={handleEditSubmit}
            initialData={currentBook as BookFormInputs}
            schema={bookSchema} // Passa o schema
            fields={{
              title: {
                type: 'text',
                label: 'Título',
              },
              authorId: {
                type: 'select',
                label: 'Autor',
                options: authors.map((author) => ({
                  value: author.id,
                  label: author.name,
                })),
              },
            }}
          />
        )} 
    </>
  );
};
