import { Button, Table } from '@radix-ui/themes';
import { Trash } from 'lucide-react';

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
  return (

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
              <Button
                variant="surface"
                onClick={() => onDelete(item.id)}
                color="crimson"
              >
                <Trash />
                Delete
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>

  );
};
