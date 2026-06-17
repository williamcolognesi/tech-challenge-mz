export const TRANSACTION_TYPE = {
  PIX:           { codigo: 1 },
  DEPOSITO:      { codigo: 2 },
  TRANSFERENCIA: { codigo: 3 },
  SAQUE:         { codigo: 4 },
  OUTROS:        { codigo: 5 },
} as const

export const TRANSACTION_DIRECTION = {
  ENTRADA: { codigo: 1 },
  SAIDA:   { codigo: 2 },
} as const

export const TRANSACTION_CATEGORY = {
  ALIMENTACAO:    { codigo: 1 },
  LAZER:          { codigo: 2 },
  ASSINATURA:     { codigo: 3 },
  CASA:           { codigo: 4 },
  EDUCACAO:       { codigo: 5 },
  RECEITAS_FIXAS: { codigo: 6 },
  OUTROS:         { codigo: 7 },
} as const
