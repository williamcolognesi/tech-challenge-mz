'use server';

import { revalidatePath } from 'next/cache';
import { api } from '@/lib/api/client';
import { toITransaction } from '../../mappers/transaction.mapper';
import type { ITransactionResponseDTO } from '../../dto/transaction.response.dto';
import type { ITransactionInput } from '../../model/transaction.inputs.types';
import type { ITransaction } from '../../model/transaction.types';

type ActionResult = { data: ITransaction; error?: never } | { data?: never; error: string }

export async function updateTransaction(id: number, input: ITransactionInput): Promise<ActionResult> {
  try {
    const response = await api.put<ITransactionResponseDTO>(`/transacoes/${id}`, {
      valor: input.valor,
      tipo: input.tipo,
      direcao: input.direcao,
      categoria: input.categoria,
      descricao: input.descricao,
      dataTransacao: input.dataTransacao.toISOString(),
      comprovanteId: input.comprovanteId,
    });
    revalidatePath('/dashboard');
    revalidatePath('/transactions');
    return { data: toITransaction(response) };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Erro ao atualizar transação.' };
  }
}
