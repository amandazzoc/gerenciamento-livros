import { useAppContext } from '../hooks/useAppContext';

const Home = () => {
  const { books, authors } = useAppContext();
  
  return (
    <div className="page">
      <div className="content">
        <div className="dados">
          <div className="card">
            <h1>{books.length}</h1>
            <p>Livros Cadastrados</p>
          </div>
          <div className="card">
            <h1>{authors.length}</h1>
            <p>Autores Cadastrados</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
