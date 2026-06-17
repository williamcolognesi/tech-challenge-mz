import { getTransactions } from "@/features/transactions/api/queries/getTransactions"
import { getEnums } from "@/features/transactions/api/queries/getEnums"
import { TransactionsContent } from "../components/transactions-content"

export default async function TransactionsPage() {
  const [transactions, enums] = await Promise.all([
    getTransactions(),
    getEnums(),
  ])

  return <TransactionsContent transactions={transactions} enums={enums} />
}
