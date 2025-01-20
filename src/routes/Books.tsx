import { AppProvider } from '../context/AppContext';
import { BooksPage } from '../pages/BooksPage';

const Books = () => {
  return (
    <AppProvider>
      <div>
        <div className="page">
          <div className="content">
            <BooksPage />
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default Books;
