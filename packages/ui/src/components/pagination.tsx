import * as React from "react"
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"
import { cn } from "../lib/utils"

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | "...")[] = [1]

  if (current > 3) pages.push("...")

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push("...")

  pages.push(total)

  return pages
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(page, totalPages)

  return (
    <nav
      role="navigation"
      aria-label="Paginação"
      className={cn("flex items-center justify-center gap-1", className)}
    >
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => onPageChange(1)}
        disabled={page <= 1}
        aria-label="Primeira página"
      >
        <ChevronFirst className="size-4" />
      </Button>

      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Página anterior"
      >
        <ChevronLeft className="size-4" />
      </Button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="flex size-7 items-center justify-center text-sm text-neutral-400"
          >
            …
          </span>
        ) : (
          <Button
            key={p}
            variant={p === page ? "default" : "outline"}
            size="icon-sm"
            onClick={() => onPageChange(p)}
            aria-label={`Página ${p}`}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Próxima página"
      >
        <ChevronRight className="size-4" />
      </Button>

      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => onPageChange(totalPages)}
        disabled={page >= totalPages}
        aria-label="Última página"
      >
        <ChevronLast className="size-4" />
      </Button>
    </nav>
  )
}
