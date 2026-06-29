export const dynamic = 'force-dynamic'

import { getEnums } from '@/features/transactions/api/queries/getEnums'
import { fetchTransactionsPage } from '@/features/transactions/api/queries/fetchTransactionsPage'
import { TransactionsContent } from '../components/transactions-content'
import type { TransactionCategory } from '@/features/transactions/model/transaction.types'

const PAGE_SIZE = 6

function currentMonth() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

interface SearchParams {
  month?: string
  categoria?: string
  page?: string
}

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  const month = params.month ?? currentMonth()
  const categoriaParam = params.categoria ?? 'all'
  const page = Math.max(1, Number(params.page ?? '1'))

  const semCategoria = categoriaParam === '__none__'
  const categoriaForApi =
    !semCategoria && categoriaParam !== 'all'
      ? (Number(categoriaParam) as TransactionCategory)
      : undefined

  const [enums, result] = await Promise.all([
    getEnums(),
    fetchTransactionsPage({ month, categoria: categoriaForApi, semCategoria, page, size: PAGE_SIZE }),
  ])

  return (
    <TransactionsContent
      enums={enums}
      pageData={result.page}
      saldo={result.saldo}
      income={result.income}
      expense={result.expense}
      currentMonth={month}
      currentCategoria={categoriaParam}
      currentPage={page}
    />
  )
}
