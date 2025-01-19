/**
 * Representa um livro.
 */
export interface Book {
  /** O ID único do livro. */
  id: string;
  /** O título do livro. */
  title: string;
  /** O ID do autor do livro. */
  authorId: string;
}
