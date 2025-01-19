import { Dialog, Button, Flex } from '@radix-ui/themes';
import { DetailsModalProps } from '../types/DetailsModalProps';

export const DetailsModal: React.FC<DetailsModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Detalhes</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          <div>
            {Object.keys(data).map((key) => (
              <div key={key}>
                <strong>{key}:</strong> {data[key]}
              </div>
            ))}
          </div>
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Fechar
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
