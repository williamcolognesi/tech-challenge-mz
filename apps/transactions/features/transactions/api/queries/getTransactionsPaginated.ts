import { api } from '@/lib/api/client';
import { toLocalDateTimeString } from '@/lib/date-utils';
import { toITransaction } from '../../mappers/transaction.mapper';
import type { ITransactionResponseDTO } from '../../dto/transaction.response.dto';
import type { ITransactionPageParams } from '../../model/transaction.search.types';
import type { ITransaction } from '../../model/transaction.types';
import type { IPageResponse } from '../../model/page.types';

function buildQueryString(params: ITransactionPageParams): string {
  const qs = new URLSearchParams();
  if (params.tipo != null) qs.set('tipo', String(params.tipo));
  if (params.direcao != null) qs.set('direcao', String(params.direcao));
  if (params.categoria != null) qs.set('categoria', String(params.categoria));
  if (params.semCategoria) qs.set('semCategoria', 'true');
  if (params.descricao) qs.set('descricao', params.descricao);
  if (params.dataInicio) qs.set('dataInicio', toLocalDateTimeString(params.dataInicio));
  if (params.dataFim) qs.set('dataFim', toLocalDateTimeString(params.dataFim));
  if (params.page != null) qs.set('page', String(params.page));
  if (params.size != null) qs.set('size', String(params.size));
  const str = qs.toString();
  return str ? `?${str}` : '';
}

export async function getTransactionsPaginated(
  params: ITransactionPageParams = {}
): Promise<IPageResponse<ITransaction>> {
  const raw = await api.get<IPageResponse<ITransactionResponseDTO>>(
    `/transacoes/paginado${buildQueryString(params)}`
  );
  return {
    ...raw,
    content: raw.content.map(toITransaction),
  };
}
