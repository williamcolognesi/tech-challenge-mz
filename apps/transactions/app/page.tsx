export const dynamic = 'force-dynamic'

import { unstable_noStore as noStore } from 'next/cache'
import { getTransactions } from "@/features/transactions/api/queries/getTransactions"
import { getEnums } from "@/features/transactions/api/queries/getEnums"
import { TransactionsContent } from "../components/transactions-content"

export default async function TransactionsPage() {
  noStore()

  const [transactions, enums] = await Promise.all([
    getTransactions(),
    getEnums(),
  ])

  return <TransactionsContent transactions={transactions} enums={enums} />
}
