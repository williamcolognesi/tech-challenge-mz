/**
 * Formata uma data para o padrão LocalDateTime do Spring (sem milissegundos e sem 'Z').
 * Ex: 2026-06-01T00:00:00
 */
export function toLocalDateTimeString(date: Date): string {
  return date.toISOString().replace(/\.\d{3}Z$/, '');
}
