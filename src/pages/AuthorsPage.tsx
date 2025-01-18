import { Button, Dialog, Flex, TextField } from '@radix-ui/themes';
import { Plus } from 'lucide-react';
import { DataList } from '../components/DataList';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';


export const AuthorsPage: React.FC = () => {
  const { addAuthor, authors, deleteAuthor } = useAppContext();
  const [isModalOpen, setModalOpen] = useState(false);

  const authorSchema = z.object({
    name: z
      .string()
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .regex(/^[a-zA-Z\s]+$/, 'O título deve conter apenas letras e espaços'),
  });

  type AuthorFormInputs = z.infer<typeof authorSchema>;

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
    setModalOpen(false); // Fecha o modal apenas se os dados forem válidos
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
                  <label>
                    <p>Nome</p>
                    <TextField.Root
                      {...register('name')}
                      placeholder="Nome do Autor"
                      aria-invalid={!!errors.name}
                    ></TextField.Root>
                    {errors.name && (
                      <p style={{ color: 'red' }}>{errors.name.message}</p>
                    )}
                  </label>

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
        />
      </div>
    </div>
  );
};
