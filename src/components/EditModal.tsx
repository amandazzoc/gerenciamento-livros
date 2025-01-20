import { Button, Dialog, Flex, TextField } from '@radix-ui/themes';
import React, { useEffect } from 'react';

interface EditModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (data: T) => void;
  initialData: T;
  schema: any;
  fields: Record<
    keyof T,
    {
      type: 'text' | 'select' | 'hidden';
      label?: string;
      options?: { value: string; label: string }[];
    }
  >;
}

export const EditModal = <T extends Record<string, any>>({
  isOpen,
  onClose,
  onEdit,
  initialData,
  fields,
}: EditModalProps<T>) => {
  const [formData, setFormData] = React.useState<T>(initialData);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
    }
  }, [isOpen, initialData]);

  const handleChange = (field: keyof T, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setFormData(initialData); // Reseta o formulário para os dados iniciais
    onClose(); // Fecha o modal
  };

  const handleSubmit = () => {
    onEdit(formData);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Title>Editar</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Preencha os campos abaixo para editar as informações.
        </Dialog.Description>

        <Flex direction="column" gap="4">
          {Object.entries(fields).map(([key, config]) => {
            const fieldId = `field-${key}`;
            return (
              <label key={key}>
                <p>{config.label}</p>
                {config.type === 'hidden' ? (
                  <input
                    id={fieldId}
                    name={key}
                    type="hidden"
                    value={formData[key as keyof T] as string}
                    onChange={(e) =>
                      handleChange(key as keyof T, e.target.value)
                    }
                  />
                ) : config.type === 'text' ? (
                  <TextField.Root
                    id={fieldId}
                    name={key}
                    value={formData[key as keyof T] as string}
                    onChange={(e) =>
                      handleChange(key as keyof T, e.target.value)
                    }
                  />
                ) : (
                  <select
                    id={fieldId}
                    name={key}
                    value={formData[key as keyof T] as string}
                    onChange={(e) =>
                      handleChange(key as keyof T, e.target.value)
                    }
                  >
                    {config.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </label>
            );
          })}
          <Flex gap="2" justify="end">
            <Button onClick={handleCancel} variant="soft" color="gray">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} color="indigo">
              Salvar
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
