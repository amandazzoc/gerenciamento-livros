import { AuthorForm } from '../components/AuthorForm';
import { AuthorList } from '../components/AuthorList';

export const AuthorsPage: React.FC = () => (
  <div>
    <h1>Authors</h1>
    <AuthorForm />
    <AuthorList />
  </div>
);
