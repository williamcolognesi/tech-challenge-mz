import { api } from '@/lib/api/client';
import { toITransaction } from '../../mappers/transaction.mapper';
import type { ITransactionResponseDTO } from '../../dto/transaction.response.dto';
import { TRANSACTION_CATEGORY, TRANSACTION_DIRECTION } from '../../model/constants';
import { getEnums } from './getEnums';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

const CATEGORY_COLORS: Record<number, string> = {
  [TRANSACTION_CATEGORY.ALIMENTACAO.codigo]: '#ef4444',
  [TRANSACTION_CATEGORY.LAZER.codigo]: '#f97316',
  [TRANSACTION_CATEGORY.ASSINATURA.codigo]: '#eab308',
  [TRANSACTION_CATEGORY.CASA.codigo]: '#06b6d4',
  [TRANSACTION_CATEGORY.EDUCACAO.codigo]: '#8b5cf6',
  [TRANSACTION_CATEGORY.RECEITAS_FIXAS.codigo]: '#22c55e',
  [TRANSACTION_CATEGORY.OUTROS.codigo]: '#6b7280',
};

export async function getExpensesByCategory(): Promise<CategoryData[]> {
  const [dtos, enums] = await Promise.all([
    api.get<ITransactionResponseDTO[]>(`/transacoes?direcao=${TRANSACTION_DIRECTION.SAIDA.codigo}`),
    getEnums(),
  ]);
  const transactions = dtos.map(toITransaction);

  const map = new Map<number, number>();
  transactions.forEach((tx) => {
    if (tx.categoria != null) {
      map.set(tx.categoria, (map.get(tx.categoria) ?? 0) + tx.valor);
    }
  });

  const result: CategoryData[] = [];
  map.forEach((value, codigo) => {
    const name = enums.categorias.find((c) => c.codigo === codigo)?.descricao ?? 'Outros';
    result.push({
      name,
      value: Math.round(value * 100) / 100,
      color: CATEGORY_COLORS[codigo] ?? '#6b7280',
    });
  });

  return result.sort((a, b) => b.value - a.value);
}
