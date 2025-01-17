import { useAppContext } from '../context/AppContext';

export const BookList: React.FC = () => {
  const { books, authors, deleteBook } = useAppContext();

  return (
    <ul>
      {books.map((book) => {
        const author =
          authors.find((a) => a.id === book.authorId)?.name || 'Unknown';
        return (
          <li key={book.id}>
            {book.title} by {author}
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};
