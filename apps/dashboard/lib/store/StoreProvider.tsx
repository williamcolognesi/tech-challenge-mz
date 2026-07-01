/* eslint-disable react-hooks/refs */
'use client'

import { useRef, useEffect } from 'react'
import { Provider } from 'react-redux'
import { makeStore, type AppStore } from './store'
import type { ITransaction } from '@/features/transactions/model/transaction.types'
import type { IEnums } from '@/features/transactions/dto/enums.dto'
import { setDashboardData, setEnums, type RevenueVsExpense, type ExpenseByCategory } from './slices/dashboardSlice'

interface Props {
  children: React.ReactNode
  balance: number
  income: number
  expense: number
  recentTransactions: ITransaction[]
  revenueVsExpenses: RevenueVsExpense[]
  expensesByCategory: ExpenseByCategory[]
  enums: IEnums
}

export function StoreProvider({
  children,
  balance,
  income,
  expense,
  recentTransactions,
  revenueVsExpenses,
  expensesByCategory,
  enums,
}: Props) {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()
    storeRef.current.dispatch(
      setDashboardData({
        balance,
        income,
        expense,
        recentTransactions,
        revenueVsExpenses,
        expensesByCategory,
      })
    )
    storeRef.current.dispatch(setEnums(enums))
  }

  // Sync store with new props on Server Component updates
  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.dispatch(
        setDashboardData({
          balance,
          income,
          expense,
          recentTransactions,
          revenueVsExpenses,
          expensesByCategory,
        })
      )
      storeRef.current.dispatch(setEnums(enums))
    }
  }, [balance, income, expense, recentTransactions, revenueVsExpenses, expensesByCategory, enums])

  return <Provider store={storeRef.current}>{children}</Provider>
}
