import { api } from '@/lib/api/client';
import { TRANSACTION_CATEGORY, TRANSACTION_DIRECTION } from '../../model/constants';
import { getEnums } from './getEnums';

interface CategoryData {
  name: string;
  value: number;
  count: number;
  color: string;
}

interface ResumoCategoriaDTO {
  categoria: number;
  total: number;
  quantidade: number;
}

const CATEGORY_COLORS: Record<number, string> = {
  [TRANSACTION_CATEGORY.ALIMENTACAO.codigo]:        '#ef4444',
  [TRANSACTION_CATEGORY.LAZER.codigo]:              '#f97316',
  [TRANSACTION_CATEGORY.ASSINATURA.codigo]:         '#eab308',
  [TRANSACTION_CATEGORY.CASA.codigo]:               '#06b6d4',
  [TRANSACTION_CATEGORY.EDUCACAO.codigo]:           '#8b5cf6',
  [TRANSACTION_CATEGORY.RECEITAS_FIXAS.codigo]:     '#22c55e',
  [TRANSACTION_CATEGORY.OUTROS.codigo]:             '#6b7280',
  [TRANSACTION_CATEGORY.SAUDE.codigo]:              '#ec4899',
  [TRANSACTION_CATEGORY.TRANSPORTE.codigo]:         '#3b82f6',
  [TRANSACTION_CATEGORY.RECEITAS_VARIAVEIS.codigo]: '#10b981',
  [TRANSACTION_CATEGORY.VIAGEM.codigo]:             '#f59e0b',
};

export async function getExpensesByCategory(): Promise<CategoryData[]> {
  const [resumos, enums] = await Promise.all([
    api.get<ResumoCategoriaDTO[]>(
      `/transacoes/resumo/categorias?direcao=${TRANSACTION_DIRECTION.SAIDA.codigo}`
    ),
    getEnums(),
  ]);

  return resumos.map((r) => ({
    name: enums.categorias.find((c) => c.codigo === r.categoria)?.descricao ?? 'Outros',
    value: r.total,
    count: r.quantidade,
    color: CATEGORY_COLORS[r.categoria] ?? '#6b7280',
  }));
}
