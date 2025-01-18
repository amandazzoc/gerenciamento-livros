import { Dialog, Button } from '@radix-ui/themes';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="400px">
        <Dialog.Title>Confirmar Exclusão</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Tem certeza que deseja excluir o autor "{itemName}"?
        </Dialog.Description>

        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
        >
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={onClose}>
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
    </Dialog.Root>
  );
};
