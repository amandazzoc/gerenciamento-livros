import { BookForm } from '../components/BookForm';
import { BookList } from '../components/BookList';

export const BooksPage: React.FC = () => (
  <div className="page">
    <h1>Books</h1>
    <BookForm />
    <BookList />
  </div>
);
