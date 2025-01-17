import { useAppContext } from '../context/AppContext';

export const AuthorList: React.FC = () => {
  const { authors, deleteAuthor } = useAppContext();

  return (
    <ul>
      {authors.map((author) => {
        return (
          <li key={author.id}>
            {author.name}
            <button onClick={() => deleteAuthor(author.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};
