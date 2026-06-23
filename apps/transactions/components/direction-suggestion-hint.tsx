"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@no-bolso/ui/src/components/button"
import type { IEnums } from "@/features/transactions/dto/enums.dto"
import { suggestDirection } from "@/lib/direction-suggestion"

interface Props {
  categoria: string   // current categoria select value
  direcao: string     // current direcao select value
  enums: IEnums
  onApply: (codigo: string) => void
}

export function DirectionSuggestionHint({ categoria, direcao, enums, onApply }: Props) {
  const suggestedCodigo = suggestDirection(categoria)
  if (suggestedCodigo === null) return null

  // Only suggest when direction differs from suggestion
  if (direcao === String(suggestedCodigo)) return null

  const match = enums.direcoes.find((d) => d.codigo === suggestedCodigo)
  if (!match) return null

  return (
    <div className="flex items-center gap-2 rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-sm">
      <Sparkles size={14} className="shrink-0 text-blue-500" aria-hidden />
      <span className="text-blue-700">
        Sugestão: <strong>{match.descricao}</strong>
      </span>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="ml-auto h-auto px-2 py-0.5 text-xs text-blue-600 hover:bg-blue-100 hover:text-blue-700"
        onClick={() => onApply(String(match.codigo))}
      >
        Aplicar
      </Button>
    </div>
  )
}
