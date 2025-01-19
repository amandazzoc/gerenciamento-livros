/**
 * Propriedades do componente de lista de dados.
 *
 * @template T Tipo dos itens na lista.
 */
export interface DataListProps<T> {
  /** Os dados a serem exibidos na lista. */
  data: T[];
  /** Colunas da lista, cada uma com um cabeçalho e um acessador. */
  columns: { header: string; accessor: keyof T | ((item: T) => any) }[];
  /** Função chamada ao excluir um item, recebendo o ID do item. */
  onDelete: (id: string) => void;
  /** Função que renderiza os detalhes do item. */
  onEdit: (item: T) => void;
  renderItemDetails: (item: T) => { [key: string]: string | number };
}
