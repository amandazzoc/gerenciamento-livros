/**
 * Propriedades do modal de edição.
 */
export interface EditModalProps {
  /** Indica se o modal está aberto. */
  open: boolean;
  /** Função chamada ao fechar o modal. */
  onClose: () => void;
  /** Título do modal. */
  title: string;
  /** Conteúdo do modal, representado por elementos filhos. */
  children: React.ReactNode;
}
