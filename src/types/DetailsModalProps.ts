/**
 * Propriedades do modal de detalhes.
 */
export interface DetailsModalProps {
  /** Indica se o modal está aberto. */
  isOpen: boolean;
  /** Função chamada ao fechar o modal. */
  onClose: () => void;
  /** Dados que você quer exibir no modal. */
  data: { [key: string]: string | number };
}
