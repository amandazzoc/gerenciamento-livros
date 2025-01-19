import { Button, Table, Flex } from '@radix-ui/themes';
import { Trash, Eye, Pen } from 'lucide-react';
import { useState } from 'react';
import { DetailsModal } from './DetailsModal';
import { ConfirmDeleteModal } from './ConfirmModal';
import { DataListProps } from '../types/DataListProps';

export const DataList = <T extends { id: string }>({
  data,
  columns,
  onDelete,
  onEdit, // Adiciona a prop onEdit
  renderItemDetails,
}: DataListProps<T>): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    if (selectedItem) {
      onDelete(selectedItem.id);
      setSelectedItem(null);
      setDeleteModalOpen(false);
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
                  {/* Botão de exclusão */}
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

                  {/* Botão para edição */}
                  <Button
                    variant="surface"
                    color="green"
                    onClick={() => {
                      if (onEdit) {
                        onEdit(item); // Chama a função onEdit com o item selecionado
                      }
                    }}
                  >
                    <Pen />
                  </Button>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/* Modal de detalhes */}
      {selectedItem && (
        <DetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          data={renderItemDetails(selectedItem)}
        />
      )}

      {/* Modal de confirmação de exclusão */}
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
