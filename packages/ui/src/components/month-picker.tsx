"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { cn } from "../lib/utils"

const MONTHS = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
]

const MONTHS_FULL = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

interface MonthPickerProps {
  value: string // "YYYY-MM"
  onChange: (value: string) => void
  maxYearsBack?: number
  className?: string
}

function parseValue(value: string): { year: number; month: number } {
  const [y, m] = value.split("-").map(Number)
  return { year: y, month: m }
}

function formatValue(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, "0")}`
}

export function MonthPicker({ value, onChange, maxYearsBack = 5, className }: MonthPickerProps) {
  const [open, setOpen] = React.useState(false)
  const { year, month } = parseValue(value)

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  const minYear = currentYear - maxYearsBack

  const [pickerYear, setPickerYear] = React.useState(year)

  // Sync picker year when value changes externally
  React.useEffect(() => {
    setPickerYear(parseValue(value).year)
  }, [value])

  const isCurrentMonth = year === currentYear && month === currentMonth

  function prev() {
    if (month === 1) onChange(formatValue(year - 1, 12))
    else onChange(formatValue(year, month - 1))
  }

  function next() {
    if (isCurrentMonth) return
    if (month === 12) onChange(formatValue(year + 1, 1))
    else onChange(formatValue(year, month + 1))
  }

  function selectMonth(m: number) {
    onChange(formatValue(pickerYear, m))
    setOpen(false)
  }

  function isFutureMonth(m: number) {
    return pickerYear > currentYear || (pickerYear === currentYear && m > currentMonth)
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button
        variant="outline"
        size="icon-sm"
        onClick={prev}
        disabled={year <= minYear && month === 1}
        aria-label="Mês anterior"
        type="button"
      >
        <ChevronLeft className="size-4" />
      </Button>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            type="button"
            className="h-9 min-w-[140px] px-3 text-sm font-medium sm:h-10"
            aria-label="Selecionar mês e ano"
          >
            {MONTHS_FULL[month - 1]}, {year}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3" align="center">
          {/* Year navigation */}
          <div className="mb-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon-sm"
              type="button"
              onClick={() => setPickerYear((y) => Math.max(minYear, y - 1))}
              disabled={pickerYear <= minYear}
              aria-label="Ano anterior"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-sm font-semibold">{pickerYear}</span>
            <Button
              variant="ghost"
              size="icon-sm"
              type="button"
              onClick={() => setPickerYear((y) => Math.min(currentYear, y + 1))}
              disabled={pickerYear >= currentYear}
              aria-label="Próximo ano"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          {/* Month grid */}
          <div className="grid grid-cols-3 gap-1">
            {MONTHS.map((label, i) => {
              const m = i + 1
              const isSelected = pickerYear === year && m === month
              const disabled = isFutureMonth(m)
              return (
                <Button
                  key={m}
                  variant={isSelected ? "default" : "ghost"}
                  size="sm"
                  type="button"
                  disabled={disabled}
                  onClick={() => selectMonth(m)}
                  className="h-8 text-xs"
                  aria-label={`${MONTHS_FULL[i]} ${pickerYear}`}
                  aria-pressed={isSelected}
                >
                  {label}
                </Button>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>

      <Button
        variant="outline"
        size="icon-sm"
        onClick={next}
        disabled={isCurrentMonth}
        aria-label="Próximo mês"
        type="button"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}
