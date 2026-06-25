/* eslint-disable react-hooks/refs */
'use client'

import { useRef, useEffect } from 'react'
import { Provider } from 'react-redux'
import { makeStore, type AppStore } from './store'
import type { ITransaction } from '@/features/transactions/model/transaction.types'
import type { IEnums } from '@/features/transactions/dto/enums.dto'
import type { IPageResponse } from '@/features/transactions/model/page.types'
import {
  setTransactionsPage,
  setBalance,
  setEnums,
  setCurrentMonth,
  setCurrentCategoria,
  setCurrentPage,
} from './slices/transactionsSlice'

interface Props {
  children: React.ReactNode
  pageData: IPageResponse<ITransaction>
  saldo: number
  income: number
  expense: number
  enums: IEnums
  currentMonth: string
  currentCategoria: string
  currentPage: number
}

export function StoreProvider({ children, pageData, saldo, income, expense, enums, currentMonth, currentCategoria, currentPage }: Props) {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()
    storeRef.current.dispatch(setTransactionsPage(pageData))
    storeRef.current.dispatch(setBalance({ saldo, income, expense }))
    storeRef.current.dispatch(setEnums(enums))
    storeRef.current.dispatch(setCurrentMonth(currentMonth))
    storeRef.current.dispatch(setCurrentCategoria(currentCategoria))
    storeRef.current.dispatch(setCurrentPage(currentPage))
  }

  // Sync store with new props on Server Component updates
  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.dispatch(setTransactionsPage(pageData))
      storeRef.current.dispatch(setBalance({ saldo, income, expense }))
      storeRef.current.dispatch(setEnums(enums))
      storeRef.current.dispatch(setCurrentMonth(currentMonth))
      storeRef.current.dispatch(setCurrentCategoria(currentCategoria))
      storeRef.current.dispatch(setCurrentPage(currentPage))
    }
  }, [pageData, saldo, income, expense, enums, currentMonth, currentCategoria, currentPage])

  return <Provider store={storeRef.current}>{children}</Provider>
}
