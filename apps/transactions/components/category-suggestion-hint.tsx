"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@no-bolso/ui/src/components/button"
import type { IEnums } from "@/features/transactions/dto/enums.dto"
import { suggestCategory } from "@/lib/category-suggestion"

interface Props {
  descricao: string
  categoria: string  // current select value ("__none__" or codigo string)
  enums: IEnums
  onApply: (codigo: string) => void
}

export function CategorySuggestionHint({ descricao, categoria, enums, onApply }: Props) {
  // Only suggest when no category is selected
  if (categoria !== "__none__") return null

  const suggestedCodigo = suggestCategory(descricao)
  if (suggestedCodigo === null) return null

  const match = enums.categorias.find((c) => c.codigo === suggestedCodigo)
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
