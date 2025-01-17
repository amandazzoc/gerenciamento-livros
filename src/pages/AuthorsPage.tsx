import { AuthorForm } from '../components/AuthorForm';
import { AuthorList } from '../components/AuthorList';

export const AuthorsPage: React.FC = () => (
  <div className="page">
    <h1>Cadastro de Autor</h1>
    <AuthorForm />
    <AuthorList />
  </div>
);
