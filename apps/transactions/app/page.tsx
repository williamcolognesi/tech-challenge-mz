import { getTransactions } from "@/features/transactions/api/queries/getTransactions"
import { TransactionsContent } from "../components/transactions-content"

export default async function TransactionsPage() {
  const transactions = await getTransactions()

  return <TransactionsContent transactions={transactions} />
}
