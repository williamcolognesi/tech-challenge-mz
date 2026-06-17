import { api } from '@/lib/api/client';
import { toITransaction } from '../../mappers/transaction.mapper';
import type { ITransactionResponseDTO } from '../../dto/transaction.response.dto';
import type { ITransactionSearch } from '../../model/transaction.search.types';
import type { ITransaction } from '../../model/transaction.types';

function buildQueryString(filters?: ITransactionSearch): string {
  if (!filters) return '';
  const params = new URLSearchParams();
  if (filters.tipo != null) params.set('tipo', String(filters.tipo));
  if (filters.direcao != null) params.set('direcao', String(filters.direcao));
  if (filters.categoria != null) params.set('categoria', String(filters.categoria));
  if (filters.descricao) params.set('descricao', filters.descricao);
  if (filters.dataInicio) params.set('dataInicio', filters.dataInicio.toISOString());
  if (filters.dataFim) params.set('dataFim', filters.dataFim.toISOString());
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export async function getTransactions(filters?: ITransactionSearch): Promise<ITransaction[]> {
  const dtos = await api.get<ITransactionResponseDTO[]>(`/transacoes${buildQueryString(filters)}`);
  return dtos.map(toITransaction);
}
