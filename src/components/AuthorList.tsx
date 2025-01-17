import { Button, Table } from '@radix-ui/themes';
import { Trash } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const AuthorList: React.FC = () => {
  const { authors, deleteAuthor } = useAppContext();

  return (
    <div className="list">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Autor</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Ações</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {authors.map((author) => (
            <Table.Row key={author.id}>
              <Table.RowHeaderCell>{author.name}</Table.RowHeaderCell>
              <Table.Cell>
                <Button
                  variant="surface"
                  onClick={() => deleteAuthor(author.id)}
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
    </div>
  );
};
