/**
 * Propriedades do modal de confirmação de exclusão.
 */
export interface ConfirmDeleteModalProps {
  /** Indica se o modal está aberto. */
  isOpen: boolean;
  /** Função chamada ao fechar o modal. */
  onClose: () => void;
  /** Função chamada ao confirmar a exclusão. */
  onConfirm: () => void;
  /** Título do modal. */
  title: string;
  /** Descrição do modal. */
  description: string;
}
