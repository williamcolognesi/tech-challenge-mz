import { api } from '@/lib/api/client';
import { toLocalDateTimeString } from '@/lib/date-utils';
import { TRANSACTION_DIRECTION } from '../../model/constants';
import type { TransactionCategory } from '../../model/transaction.types';

interface SaldoFilters {
  direcao?: number;
  categoria?: TransactionCategory;
  semCategoria?: boolean;
  dataInicio?: Date;
  dataFim?: Date;
}

interface SaldoResponseDTO {
  saldo: number;
}

export async function getBalance(filters?: SaldoFilters): Promise<number> {
  const params = new URLSearchParams();
  if (filters?.direcao != null) params.set('direcao', String(filters.direcao));
  if (filters?.categoria != null) params.set('categoria', String(filters.categoria));
  if (filters?.semCategoria) params.set('semCategoria', 'true');
  if (filters?.dataInicio) params.set('dataInicio', toLocalDateTimeString(filters.dataInicio));
  if (filters?.dataFim) params.set('dataFim', toLocalDateTimeString(filters.dataFim));
  const qs = params.toString();
  const { saldo } = await api.get<SaldoResponseDTO>(`/transacoes/saldo${qs ? `?${qs}` : ''}`);
  return saldo;
}

export async function getBalanceSummary(
  dataInicio: Date,
  dataFim: Date,
  categoria?: TransactionCategory,
  semCategoria?: boolean,
) {
  const monthFilters = { dataInicio, dataFim, categoria, semCategoria };
  const [saldo, income, expense] = await Promise.all([
    // saldo acumulado até o fim do mês selecionado (sem dataInicio e sem filtros de categoria)
    getBalance({ dataFim }),
    getBalance({ ...monthFilters, direcao: TRANSACTION_DIRECTION.ENTRADA.codigo }),
    getBalance({ ...monthFilters, direcao: TRANSACTION_DIRECTION.SAIDA.codigo }),
  ]);
  return { saldo, income, expense };
}
