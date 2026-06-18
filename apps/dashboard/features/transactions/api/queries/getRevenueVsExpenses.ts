import { api } from '@/lib/api/client';
import { toITransaction } from '../../mappers/transaction.mapper';
import type { ITransactionResponseDTO } from '../../dto/transaction.response.dto';
import { TRANSACTION_DIRECTION } from '../../model/constants';

interface ChartData {
  month: string;
  receitas: number;
  despesas: number;
}

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export async function getRevenueVsExpenses(monthsBack = 6): Promise<ChartData[]> {
  const dtos = await api.get<ITransactionResponseDTO[]>('/transacoes');
  const transactions = dtos.map(toITransaction);

  const monthsMap = new Map<string, { receitas: number; despesas: number }>();
  const monthKeys: string[] = [];

  for (let i = monthsBack - 1; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const key = getMonthKey(date);
    monthsMap.set(key, { receitas: 0, despesas: 0 });
    monthKeys.push(key);
  }

  transactions.forEach((tx) => {
    const key = getMonthKey(new Date(tx.dataTransacao));
    if (monthsMap.has(key)) {
      const data = monthsMap.get(key)!;
      if (tx.direcao === TRANSACTION_DIRECTION.ENTRADA.codigo) {
        data.receitas += tx.valor;
      } else {
        data.despesas += tx.valor;
      }
    }
  });

  return monthKeys.map((key) => {
    const value = monthsMap.get(key)!;
    const [, month] = key.split('-');
    return {
      month: MONTHS[parseInt(month) - 1],
      receitas: Math.round(value.receitas * 100) / 100,
      despesas: Math.round(value.despesas * 100) / 100,
    };
  });
}
