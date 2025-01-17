import { AppProvider } from "../context/AppContext";
import { AuthorsPage } from "../pages/AuthorsPage";

const Authors = () => {
    return (
        <AppProvider>
            <div>
                <AuthorsPage />
            </div>
        </AppProvider>
    );
};

export default Authors;
