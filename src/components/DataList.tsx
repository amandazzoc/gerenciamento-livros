import { Button, Table, Dialog } from '@radix-ui/themes';
import { Trash } from 'lucide-react';
import { useState } from 'react';

interface DataListProps<T> {
  data: T[];
  columns: { header: string; accessor: keyof T | ((item: T) => any) }[];
  onDelete: (id: string) => void;
}

export const DataList = <T extends { id: string }>({
  data,
  columns,
  onDelete,
}: DataListProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleDelete = () => {
    if (selectedItem) {
      onDelete(selectedItem.id); 
    }
  };

  return (
    <>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => (
              <Table.ColumnHeaderCell key={index}>
                {col.header}
              </Table.ColumnHeaderCell>
            ))}
            <Table.ColumnHeaderCell>Ações</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.id}>
              {columns.map((col, index) => {
                const value =
                  typeof col.accessor === 'function'
                    ? col.accessor(item)
                    : item[col.accessor];
                return (
                  <Table.RowHeaderCell key={index}>
                    {String(value)}
                  </Table.RowHeaderCell>
                );
              })}
              <Table.Cell>
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button
                      variant="surface"
                      color="crimson"
                      onClick={() => {
                        setSelectedItem(item); // Define o item a ser deletado
                      }}
                    >
                      <Trash />
                      Delete
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content maxWidth="400px">
                    <Dialog.Title>Confirmar Exclusão</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                      Tem certeza que deseja excluir o item?
                    </Dialog.Description>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '10px',
                      }}
                    >
                      <Dialog.Close>
                        <Button variant="soft" color="gray">
                          Cancelar
                        </Button>
                      </Dialog.Close>
                      <Dialog.Close>
                        <Button color="red" onClick={handleDelete}>
                          Confirmar
                        </Button>
                      </Dialog.Close>
                    </div>
                  </Dialog.Content>
                </Dialog.Root>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

    </>
  );
};
