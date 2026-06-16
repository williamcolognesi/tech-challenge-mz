import { DashboardContent } from "../components/dashboard-content"
import type { ITransaction } from "../model/transaction.types"

interface RevenueVsExpense {
  month: string
  receitas: number
  despesas: number
}

interface ExpenseCategory {
  name: string
  value: number
  color: string
}

export default async function DashboardPage() {
  //const balance = await getBalance()
  const balance: number = 500

  /* 
  const income = await getBalance({
    direcao: TRANSACTION_DIRECTION.ENTRADA.codigo,
  })
  */
  const income: number = 1000

  /* 
  const expense = await getBalance({
    direcao: TRANSACTION_DIRECTION.SAIDA.codigo,
  })
  */
  const expense: number = 500

  /* 
  const recentTransactions = await getRecentTransactions()
  const revenueVsExpenses = await getRevenueVsExpenses()
  const expensesByCategory = await getExpensesByCategory()
  */
  const recentTransactions: ITransaction[] = []
  const revenueVsExpenses: RevenueVsExpense[] = []
  const expensesByCategory: ExpenseCategory[] = []

  return (
    <DashboardContent
      balance={balance}
      income={income}
      expense={expense}
      recentTransactions={recentTransactions}
      revenueVsExpenses={revenueVsExpenses}
      expensesByCategory={expensesByCategory}
    />
  )
}
