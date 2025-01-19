import React, { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { AppContextType } from '../types/AppContextType';
import { Author } from '../types/Author';
import { Book } from '../types/Book';

export const AppContext = createContext<AppContextType | undefined>(undefined);

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

