"use client"

import { useState, useMemo, useTransition } from "react"
import { useRouter } from "next/navigation"
import {
  Download,
  Pencil,
  Trash2,
  Zap,
  Landmark,
  ArrowLeftRight,
  Banknote,
  CircleDollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

import { Button } from "@no-bolso/ui/src/components/button"
import { Avatar, AvatarFallback } from "@no-bolso/ui/src/components/avatar"
import { Pagination } from "@no-bolso/ui/src/components/pagination"
import { MonthPicker } from "@no-bolso/ui/src/components/month-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@no-bolso/ui/src/components/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@no-bolso/ui/src/components/alert-dialog"

import {
  TRANSACTION_TYPE,
  TRANSACTION_DIRECTION,
} from "@/features/transactions/model/constants"
import type { ITransaction } from "@/features/transactions/model/transaction.types"
import type { IEnums } from "@/features/transactions/dto/enums.dto"
import type { IPageResponse } from "@/features/transactions/model/page.types"
import { deleteTransaction } from "@/features/transactions/api/actions/deleteTransaction"
import { getComprovanteUrl } from "@/features/transactions/api/queries/getComprovanteUrl"

import { toast } from "sonner"
import { cn } from "@/lib/utils"

import { AddTransactionDialog } from "./add-transaction-dialog"
import { EditTransactionDialog } from "./edit-transaction-dialog"

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import {
  selectTransactions,
  selectBalance,
  selectEnums,
  selectFilters,
  removeTransaction,
} from "@/lib/store/slices/transactionsSlice"

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function getTypeIcon(tipo: number) {
  switch (tipo) {
    case TRANSACTION_TYPE.PIX.codigo: return <Zap size={16} />
    case TRANSACTION_TYPE.DEPOSITO.codigo: return <Landmark size={16} />
    case TRANSACTION_TYPE.TRANSFERENCIA.codigo: return <ArrowLeftRight size={16} />
    case TRANSACTION_TYPE.SAQUE.codigo: return <Banknote size={16} />
    default: return <CircleDollarSign size={16} />
  }
}


function groupByDay(transactions: ITransaction[]) {
  const groups: Record<string, ITransaction[]> = {}
  for (const t of transactions) {
    const date = new Date(t.dataTransacao)
    const key = date.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric" })
    if (!groups[key]) groups[key] = []
    groups[key].push(t)
  }
  return groups
}

export function TransactionsContent() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [editingTransaction, setEditingTransaction] = useState<ITransaction | null>(null)

  const pageData = useAppSelector(selectTransactions)!
  const { saldo, income, expense } = useAppSelector(selectBalance)
  const enums = useAppSelector(selectEnums)!
  const { currentMonth, currentCategoria, currentPage } = useAppSelector(selectFilters)

  function navigate(month: string, categoria: string, page: number) {
    const params = new URLSearchParams()
    params.set("month", month)
    if (categoria !== "all") params.set("categoria", categoria)
    params.set("page", String(page))
    startTransition(() => {
      router.replace(`?${params.toString()}`)
    })
  }

  function handleMonthChange(m: string) { navigate(m, currentCategoria, 1) }
  function handleCategoryChange(cat: string) { navigate(currentMonth, cat, 1) }
  function handlePageChange(p: number) { navigate(currentMonth, currentCategoria, p) }

  function getTypeName(tipo: number) {
    return enums.tipos.find((t) => t.codigo === tipo)?.descricao ?? "Outro"
  }

  function getCategoryLabel(categoria: number | undefined) {
    if (categoria == null) return "Sem categoria"
    return enums.categorias.find((c) => c.codigo === categoria)?.descricao ?? "—"
  }

  async function handleDelete(id: number) {
    await deleteTransaction(id)
    dispatch(removeTransaction(id))
    router.refresh()
    toast.success("Transação excluída com sucesso!")
  }

  function handleMutationDone() {
    router.refresh()
  }

  const groups = groupByDay(pageData.content)

  const isLastTxInGlobalList = useMemo(() => {
    const ids = Object.entries(groups).flatMap(([, items]) => items.map((t) => t.id))
    const lastId = ids[ids.length - 1]
    return new Map(ids.map((id) => [id, id === lastId] as const))
  }, [groups])

  return (
    <div className="flex min-h-screen w-full flex-col gap-6 px-4 py-6 sm:gap-8 sm:p-6 md:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
        <div className="flex w-full min-w-0 flex-col gap-3">
          <div className="flex min-w-0 gap-3">
            <div className="min-w-0 flex-1 sm:flex-none">
              <AddTransactionDialog enums={enums} onCreated={handleMutationDone} />
            </div>
            <MonthPicker value={currentMonth} onChange={handleMonthChange} maxYearsBack={5} />
          </div>

          <Select value={currentCategoria} onValueChange={handleCategoryChange}>
            <SelectTrigger className="h-11 min-h-11 w-full min-w-0 data-[size=default]:h-11 sm:h-10 sm:min-h-10 sm:min-w-[200px] sm:flex-1 sm:max-w-[332px] sm:data-[size=default]:h-10">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              <SelectItem value="__none__">Sem categoria</SelectItem>
              {enums.categorias.map((c) => (
                <SelectItem key={c.codigo} value={String(c.codigo)}>{c.descricao}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5 text-center sm:text-left lg:shrink-0 lg:text-right">
          <div className={cn("text-lg font-bold sm:text-xl", saldo < 0 ? "text-red-600" : "text-green-600")}>
            Balanço: {formatCurrency(saldo)}
          </div>
          <div className="text-[13px] text-[#555]">
            Entradas: <span className="font-semibold text-green-600">{formatCurrency(income)}</span>
          </div>
          <div className="text-[13px] text-[#555]">
            Saídas: <span className="font-semibold text-red-600">{formatCurrency(expense)}</span>
          </div>
        </div>
      </div>

      <div className={cn("flex flex-col gap-4 rounded-xl border border-gray-200 bg-white px-4 py-5 sm:gap-6 sm:p-6", isPending && "opacity-60 pointer-events-none")}>
        {pageData.content.length === 0 && !isPending && (
          <p className="px-2 py-6 text-center text-gray-500 sm:px-0">
            Nenhuma transação neste período.
          </p>
        )}

        {Object.entries(groups).map(([day, items]) => (
          <div key={day} className="flex flex-col gap-3">
            <div className="border-l-[3px] border-gray-300 pl-3 text-sm font-semibold capitalize text-neutral-900">
              {day}
            </div>

            {items.map((t) => (
              <div
                key={t.id}
                className={cn(
                  "flex flex-col gap-3 pb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pb-4 sm:pt-4",
                  !isLastTxInGlobalList.get(t.id) && "border-b border-gray-200",
                )}
              >
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <Avatar className="size-9 shrink-0 sm:size-10">
                    <AvatarFallback className="text-neutral-600">
                      {getTypeIcon(t.tipo)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <strong className="text-sm font-semibold text-neutral-900">
                        {getTypeName(t.tipo)}
                      </strong>
                      <span className={cn(
                        "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                        t.direcao === TRANSACTION_DIRECTION.ENTRADA.codigo
                          ? "!bg-green-100 !text-green-600"
                          : "!bg-red-100 !text-red-600",
                      )}>
                        {t.direcao === TRANSACTION_DIRECTION.ENTRADA.codigo
                          ? <><TrendingUp size={12} /> Entrada</>
                          : <><TrendingDown size={12} /> Saída</>}
                      </span>
                    </div>
                    <span className="truncate text-[11px] font-medium uppercase tracking-wide text-gray-400">
                      {getCategoryLabel(t.categoria)}
                    </span>
                    <span className="line-clamp-2 text-xs text-gray-500">
                      {t.descricao ?? "Sem descrição"}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-3 pt-1 sm:flex-col sm:items-end sm:justify-center sm:pt-0">
                  <span className="text-nowrap text-sm font-bold tabular-nums text-neutral-900 sm:text-base">
                    {formatCurrency(t.valor)}
                  </span>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      title={t.comprovante ? "Baixar comprovante" : "Sem comprovante"}
                      type="button"
                      disabled={!t.comprovante}
                      asChild={!!t.comprovante}
                    >
                      {t.comprovante ? (
                        <a href={getComprovanteUrl(t.comprovante.id)} download={t.comprovante.nome}>
                          <Download size={14} aria-hidden />
                          <span className="sr-only">Baixar comprovante</span>
                        </a>
                      ) : (
                        <>
                          <Download size={14} aria-hidden />
                          <span className="sr-only">Sem comprovante</span>
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center p-0 sm:h-8 sm:min-h-8 sm:w-auto sm:gap-2 sm:px-3"
                      onClick={() => setEditingTransaction(t)}
                      title="Editar"
                      type="button"
                    >
                      <Pencil size={14} aria-hidden />
                      <span className="hidden sm:inline">Editar</span>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon-sm" title="Excluir" type="button">
                          <Trash2 size={14} aria-hidden />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="mx-4 max-w-[calc(100vw-2rem)] sm:mx-auto">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir transação</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir esta transação? Essa ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
                          <AlertDialogCancel className="mt-0 w-full sm:w-auto">Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            className="w-full sm:w-auto"
                            onClick={() => handleDelete(t.id)}
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {pageData.totalPages > 1 && (
          <Pagination
            page={currentPage}
            totalPages={pageData.totalPages}
            onPageChange={handlePageChange}
            className="pt-2"
          />
        )}
      </div>

      {editingTransaction && (
        <EditTransactionDialog
          key={editingTransaction.id}
          transaction={editingTransaction}
          enums={enums}
          onClose={() => {
            setEditingTransaction(null)
            handleMutationDone()
          }}
        />
      )}
    </div>
  )
}
