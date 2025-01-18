import { Button, Dialog } from '@radix-ui/themes';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <div>
        <Dialog.Content maxWidth="400px">
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            {description}
          </Dialog.Description>

          <div
            style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
          >
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancelar
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button color="red" onClick={onConfirm}>
                Confirmar
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </div>
    </Dialog.Root>
  );
};
