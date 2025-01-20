import { AppProvider } from '../context/AppContext';
import { AuthorsPage } from '../pages/AuthorsPage';

const Authors = () => {
  return (
    <AppProvider>
      <div>
        <div className="page">
          <div className="content">
            <AuthorsPage />
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default Authors;
