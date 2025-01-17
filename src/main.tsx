import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Authors from './routes/Authors';
import Books from './routes/Books';
import ErrorPage from './routes/ErrorPage';
import Home from './routes/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/books',
                element: <Books />,
            },
            {
                path: '/authors',
                element: <Authors />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
