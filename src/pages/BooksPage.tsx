import { BookForm } from '../components/BookForm';
import { BookList } from '../components/BookList';

export const BooksPage: React.FC = () => (
  <div>
    <h1>Books</h1>
    <BookForm />
    <BookList />
  </div>
);
