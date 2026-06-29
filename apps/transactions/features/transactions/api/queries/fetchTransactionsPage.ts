import { getTransactionsPaginated } from './getTransactionsPaginated';
import { getBalanceSummary } from './getBalance';
import type { IPageResponse } from '../../model/page.types';
import type { ITransaction, TransactionCategory } from '../../model/transaction.types';

export interface FetchTransactionsPageParams {
  month: string; // "YYYY-MM"
  categoria?: TransactionCategory;
  semCategoria?: boolean;
  page: number;
  size?: number;
}

export interface FetchTransactionsPageResult {
  page: IPageResponse<ITransaction>;
  saldo: number;
  balanco: number;
  income: number;
  expense: number;
}

export function monthToRange(month: string): { dataInicio: Date; dataFim: Date } {
  const [year, m] = month.split('-').map(Number);
  const dataInicio = new Date(year, m - 1, 1, 0, 0, 0);
  const dataFim = new Date(year, m, 0, 23, 59, 59);
  return { dataInicio, dataFim };
}

export async function fetchTransactionsPage(
  params: FetchTransactionsPageParams
): Promise<FetchTransactionsPageResult> {
  const { dataInicio, dataFim } = monthToRange(params.month);

  const [page, summary] = await Promise.all([
    getTransactionsPaginated({
      dataInicio,
      dataFim,
      categoria: params.categoria,
      semCategoria: params.semCategoria,
      page: params.page,
      size: params.size ?? 6,
    }),
    getBalanceSummary(dataInicio, dataFim, params.categoria, params.semCategoria),
  ]);

  return { page, ...summary };
}
