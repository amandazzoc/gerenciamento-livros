import { Button, Table, Flex } from '@radix-ui/themes';
import { Trash, Eye } from 'lucide-react';
import { useState } from 'react';
import { DetailsModal } from './DetailsModal';
import { ConfirmDeleteModal } from './ConfirmModal'; 

interface DataListProps<T> {
  data: T[];
  columns: { header: string; accessor: keyof T | ((item: T) => any) }[];
  onDelete: (id: string) => void;
  renderItemDetails: (item: T) => { [key: string]: string | number };
}

export const DataList = <T extends { id: string }>({
  data,
  columns,
  onDelete,
  renderItemDetails,
}: DataListProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // Estado para controlar o modal de exclusão

  const handleDelete = () => {
    if (selectedItem) {
      onDelete(selectedItem.id);
      setSelectedItem(null);
      setDeleteModalOpen(false); // Fecha o modal de exclusão após confirmação
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
                <Flex gap="2">
                  <Button
                    variant="surface"
                    color="crimson"
                    onClick={() => {
                      setSelectedItem(item);
                      setDeleteModalOpen(true); 
                    }}
                  >
                    <Trash />
                  </Button>

                  {/* Botão para mostrar os detalhes */}
                  <Button
                    variant="surface"
                    color="indigo"
                    onClick={() => {
                      setSelectedItem(item);
                      setDetailsModalOpen(true); 
                    }}
                  >
                    <Eye />
                  </Button>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/* Exibindo o modal de detalhes com as informações do item selecionado */}
      {selectedItem && (
        <DetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          data={renderItemDetails(selectedItem)}
        />
      )}

      {/* Exibindo o modal de confirmação de exclusão */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirmar Exclusão"
        description="Tem certeza que deseja excluir o item?"
      />
    </>
  );
};
