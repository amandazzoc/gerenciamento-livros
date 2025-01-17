import { Button } from '@radix-ui/themes';
import { DataList } from '../components/DataList';
import { useAppContext } from '../context/AppContext';
import { Plus } from 'lucide-react';

export const BooksPage: React.FC = () => {
  const { books, authors, deleteBook } = useAppContext();
  return (
    <div className="page">
      <div className="content">
        <div className="header">
          <h1 className="title">Livros</h1>
          <Button color="indigo" variant="surface">
            <Plus /> Novo Livro
          </Button>
        </div>
        <DataList
          data={books}
          columns={[
            { header: 'Livro', accessor: 'title' },
            {
              header: 'Autor',
              accessor: (book) =>
                authors.find((author) => author.id === book.authorId)?.name ||
                'Unknown',
            },
          ]}
          onDelete={deleteBook}
        />
      </div>
    </div>
  );
}
  
  
