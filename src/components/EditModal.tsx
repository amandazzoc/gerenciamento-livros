import { Button, Dialog, Flex, TextField } from '@radix-ui/themes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldValues, DefaultValues, Path } from 'react-hook-form';
import { z } from 'zod';

interface EditModalProps<T extends FieldValues> {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (data: T) => void;
  initialData: T;
  schema: z.ZodSchema<T>;
  fields: (keyof T)[];
}

export const EditModal = <T extends FieldValues>({
  isOpen,
  onClose,
  onEdit,
  initialData,
  schema,
  fields,
}: EditModalProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: initialData as DefaultValues<T>, // Certifique-se de que initialData corresponde ao formato esperado
  });

  const onSubmit = (data: T) => {
    onEdit(data);
    onClose(); // Fecha o modal após a edição
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Editar Item</Dialog.Title>
        <Flex direction="column" gap="3">
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field) => (
              <label key={field.toString()}>
                <p>{field.toString()}</p>
                <TextField.Root
                  {...register(field as Path<T>)} // O campo deve ser convertido para Path<T>
                  placeholder={`Digite ${field.toString()}`}
                  aria-invalid={!!errors[field]}
                />
                {errors[field] && (
                  <p style={{ color: 'red' }}>
                    {(errors[field] as any).message}
                  </p>
                )}
              </label>
            ))}
            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray" onClick={onClose}>
                  Cancelar
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button type="submit">Salvar</Button>
              </Dialog.Close>
            </Flex>
          </form>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
