import { api } from '@/lib/api/client';

interface SaldoFilters {
  direcao?: number;
  dataInicio?: Date;
  dataFim?: Date;
}

interface SaldoResponseDTO {
  saldo: number;
}

export async function getBalance(filters?: SaldoFilters): Promise<number> {
  const params = new URLSearchParams();
  if (filters?.direcao != null) params.set('direcao', String(filters.direcao));
  if (filters?.dataInicio) params.set('dataInicio', filters.dataInicio.toISOString());
  if (filters?.dataFim) params.set('dataFim', filters.dataFim.toISOString());
  const qs = params.toString();

  const { saldo } = await api.get<SaldoResponseDTO>(`/transacoes/saldo${qs ? `?${qs}` : ''}`);
  return saldo;
}
