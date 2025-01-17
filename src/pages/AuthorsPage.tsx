
import { Button } from '@radix-ui/themes';
import { Plus } from 'lucide-react';
import { DataList } from '../components/DataList';
import { useAppContext } from '../context/AppContext';

export const AuthorsPage: React.FC = () => {
  const { authors, deleteAuthor } = useAppContext();
  
  return (
    <div className="page">
      <div className="content">
        <div className="header">
          <h1 className="title">Autores</h1>
          <Button color="indigo" variant="surface">
            <Plus /> Novo Autor
          </Button>
        </div>
        <DataList
          data={authors}
          columns={[{ header: 'Autor', accessor: 'name' }]}
          onDelete={deleteAuthor}
        />
      </div>
    </div>
  );
}
