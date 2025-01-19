import { Button, Dialog } from '@radix-ui/themes';
import { ConfirmDeleteModalProps } from '../types/ConfirmDeleteModalProps';

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="400px">
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {description}
        </Dialog.Description>

        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
        >
          <Button variant="soft" color="gray" onClick={onClose}>
            Cancelar
          </Button>
          <Button color="red" onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
