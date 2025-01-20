import { Button, Dialog, Flex, TextField } from '@radix-ui/themes';
import { Plus } from 'lucide-react';
import { DataList } from '../components/DataList';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { useAppContext } from '../hooks/useAppContext';

import { EditModal } from '../components/EditModal';
import { useState } from 'react';

export const AuthorsPage: React.FC = () => {
  const { addAuthor, authors, deleteAuthor, updateAuthor } = useAppContext();

  const authorSchema = z.object({
    id: z.string().uuid().optional(),
    name: z
      .string()
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .regex(/^[a-zA-Z\s]+$/, 'O nome deve conter apenas letras e espaços'),
  });

  type AuthorFormInputs = z.infer<typeof authorSchema>;

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorFormInputs | null>(
    null,
  );

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

  const handleEdit = (updatedData: AuthorFormInputs) => {
    if (selectedAuthor?.id) {
      updateAuthor({ id: selectedAuthor.id, name: updatedData.name });
    }
    setEditModalOpen(false); // Fecha o modal após a edição
    setSelectedAuthor(null);
  };

  const renderItemDetails = (author: { id: string; name: string }) => {
    return {
      Nome: author.name,
    };
  };

  return (
    <>
      <div className="header">
        <Dialog.Root>
          <Dialog.Trigger>
            <Button color="indigo" variant="surface">
              <Plus /> Novo Autor
            </Button>
          </Dialog.Trigger>

          <Dialog.Content maxWidth="450px">
            <Dialog.Title>Cadastrar Autor</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Preencha os campos abaixo para cadastrar um novo autor.
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="author-name">
                  <p>Nome</p>
                </label>
                <TextField.Root
                  id="author-name"
                  {...register('name')}
                  placeholder="Nome do Autor"
                  aria-invalid={!!errors.name}
                  autoComplete="name"
                />
                {errors.name && (
                  <p style={{ color: 'red' }}>{errors.name.message}</p>
                )}

                <Flex gap="3" mt="4" justify="end">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancelar
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <Button type="submit" disabled={!!errors.name}>
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
        data={authors}
        columns={[{ header: 'Autor', accessor: 'name' }]}
        onDelete={deleteAuthor}
        renderItemDetails={renderItemDetails}
        onEdit={(author) => {
          setSelectedAuthor(author);
          setEditModalOpen(true);
        }}
      />

      {selectedAuthor && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onEdit={handleEdit}
          initialData={selectedAuthor}
          schema={authorSchema}
          fields={{
            id: {
              type: 'hidden',
            },
            name: {
              type: 'text',
              label: 'Nome',
            },
          }}
        />
      )}
    </>
  );
};
