import { Button, Table } from '@radix-ui/themes';
import { Trash } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const BookList: React.FC = () => {
  const { books, authors, deleteBook } = useAppContext();

  return (
    <div className="list">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Livro</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Autor</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Ações</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {books.map((book) => {
            const author =
              authors.find((a) => a.id === book.authorId)?.name || 'Unknown';
            return (
              <Table.Row key={book.id}>
                <Table.RowHeaderCell>{book.title}</Table.RowHeaderCell>
                <Table.RowHeaderCell>{author}</Table.RowHeaderCell>
                <Table.Cell>
                  <Button
                    variant="surface"
                    onClick={() => deleteBook(book.id)}
                    color="crimson"
                  >
                    <Trash />
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
