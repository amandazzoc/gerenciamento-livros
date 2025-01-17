import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface Author {
  id: string;
  name: string;
}

interface Book {
  id: string;
  title: string;
  authorId: string;
}

interface AppContextType {
  authors: Author[];
  books: Book[];
  addAuthor: (author: Author) => void;
  addBook: (book: Book) => void;
  deleteAuthor: (id: string) => void;
  deleteBook: (id: string) => void;
  updateAuthor: (author: Author) => void;
  updateBook: (book: Book) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authors, setAuthors] = useLocalStorage<Author[]>('authors', []);
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);

  const addAuthor = (author: Author) => setAuthors([...authors, author]);
  const addBook = (book: Book) => setBooks([...books, book]);

  const deleteAuthor = (id: string) => {
    setAuthors(authors.filter((author) => author.id !== id));
    setBooks(books.filter((book) => book.authorId !== id)); // Remove livros relacionados
  };

  const deleteBook = (id: string) => setBooks(books.filter((book) => book.id !== id));

  const updateAuthor = (updateAuthor: Author) => {
    setAuthors(authors.map((author) => (author.id === updateAuthor.id ? updateAuthor : author)));
  }

  const updateBook = (updateBook: Book) => { 
    setBooks(books.map((book) => (book.id === updateBook.id ? updateBook : book)));
  }

  return (
    <AppContext.Provider
      value={{ authors, books, addAuthor, addBook, deleteAuthor, deleteBook, updateAuthor, updateBook }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
