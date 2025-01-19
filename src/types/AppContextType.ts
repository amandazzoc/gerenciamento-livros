import { Author } from './Author';
import { Book } from './Book';

/**
 * Interface que define o tipo de contexto da aplicação.
 *
 * Esta interface contém informações sobre autores e livros,
 * bem como funções para manipular esses dados.
 */
export interface AppContextType {
  /** Lista de autores */
  authors: Author[];

  /** Lista de livros */
  books: Book[];

  /** Função para adicionar um novo autor */
  addAuthor: (author: Author) => void;

  /** Função para adicionar um novo livro */
  addBook: (book: Book) => void;

  /** Função para excluir um autor pelo ID */
  deleteAuthor: (id: string) => void;

  /** Função para excluir um livro pelo ID */
  deleteBook: (id: string) => void;

  /** Função para atualizar as informações de um autor */
  updateAuthor: (author: Author) => void;

  /** Função para atualizar as informações de um livro */
  updateBook: (book: Book) => void;
}
