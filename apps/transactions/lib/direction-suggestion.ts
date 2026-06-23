import { TRANSACTION_CATEGORY, TRANSACTION_DIRECTION } from '@/features/transactions/model/constants'

const ENTRADA = TRANSACTION_DIRECTION.ENTRADA.codigo
const SAIDA = TRANSACTION_DIRECTION.SAIDA.codigo

const CATEGORY_DIRECTION: Record<number, number> = {
  [TRANSACTION_CATEGORY.ALIMENTACAO.codigo]:        SAIDA,
  [TRANSACTION_CATEGORY.LAZER.codigo]:              SAIDA,
  [TRANSACTION_CATEGORY.ASSINATURA.codigo]:         SAIDA,
  [TRANSACTION_CATEGORY.CASA.codigo]:               SAIDA,
  [TRANSACTION_CATEGORY.EDUCACAO.codigo]:           SAIDA,
  [TRANSACTION_CATEGORY.SAUDE.codigo]:              SAIDA,
  [TRANSACTION_CATEGORY.TRANSPORTE.codigo]:         SAIDA,
  [TRANSACTION_CATEGORY.VIAGEM.codigo]:             SAIDA,
  [TRANSACTION_CATEGORY.RECEITAS_FIXAS.codigo]:     ENTRADA,
  [TRANSACTION_CATEGORY.RECEITAS_VARIAVEIS.codigo]: ENTRADA,
  // OUTROS omitido intencionalmente — direção ambígua
}

export function suggestDirection(categoriaCodigo: string): number | null {
  if (!categoriaCodigo || categoriaCodigo === '__none__') return null
  const codigo = Number(categoriaCodigo)
  return CATEGORY_DIRECTION[codigo] ?? null
}
