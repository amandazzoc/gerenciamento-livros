import { AppProvider } from "../context/AppContext";
import { BooksPage } from "../pages/BooksPage";

const Books = () => {
    return (
        <AppProvider>
            <div>
                <BooksPage />
            </div>
        </AppProvider>
    );
};

export default Books;
