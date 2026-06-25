import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit'
import type { ITransaction } from '@/features/transactions/model/transaction.types'
import type { IEnums } from '@/features/transactions/dto/enums.dto'
import type { IPageResponse } from '@/features/transactions/model/page.types'

interface TransactionsState {
  transactions: IPageResponse<ITransaction> | null
  saldo: number
  income: number
  expense: number
  currentMonth: string
  currentCategoria: string
  currentPage: number
  enums: IEnums | null
}

function currentMonthDefault() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

const initialState: TransactionsState = {
  transactions: null,
  saldo: 0,
  income: 0,
  expense: 0,
  currentMonth: currentMonthDefault(),
  currentCategoria: 'all',
  currentPage: 1,
  enums: null,
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactionsPage: (state, action: PayloadAction<IPageResponse<ITransaction>>) => {
      state.transactions = action.payload
    },
    setBalance: (state, action: PayloadAction<{ saldo: number; income: number; expense: number }>) => {
      state.saldo = action.payload.saldo
      state.income = action.payload.income
      state.expense = action.payload.expense
    },
    setEnums: (state, action: PayloadAction<IEnums>) => {
      state.enums = action.payload
    },
    setCurrentMonth: (state, action: PayloadAction<string>) => {
      state.currentMonth = action.payload
      state.currentPage = 1
    },
    setCurrentCategoria: (state, action: PayloadAction<string>) => {
      state.currentCategoria = action.payload
      state.currentPage = 1
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    addTransaction: (state, action: PayloadAction<ITransaction>) => {
      if (state.transactions) {
        state.transactions.content.unshift(action.payload)
        state.transactions.totalElements += 1
      }
    },
    removeTransaction: (state, action: PayloadAction<number>) => {
      if (state.transactions) {
        state.transactions.content = state.transactions.content.filter(t => t.id !== action.payload)
        state.transactions.totalElements -= 1
      }
    },
    updateTransaction: (state, action: PayloadAction<ITransaction>) => {
      if (state.transactions) {
        const index = state.transactions.content.findIndex(t => t.id === action.payload.id)
        if (index !== -1) {
          state.transactions.content[index] = action.payload
        }
      }
    },
  },
})

// Selectors
const selectTransactionsState = (state: { transactions: TransactionsState }) => state.transactions

export const selectTransactions = createSelector(
  selectTransactionsState,
  (s) => s.transactions
)

export const selectBalance = createSelector(
  selectTransactionsState,
  (s) => ({ saldo: s.saldo, income: s.income, expense: s.expense })
)

export const selectEnums = createSelector(
  selectTransactionsState,
  (s) => s.enums
)

export const selectFilters = createSelector(
  selectTransactionsState,
  (s) => ({
    currentMonth: s.currentMonth,
    currentCategoria: s.currentCategoria,
    currentPage: s.currentPage,
  })
)

export const {
  setTransactionsPage,
  setBalance,
  setEnums,
  setCurrentMonth,
  setCurrentCategoria,
  setCurrentPage,
  addTransaction,
  removeTransaction,
  updateTransaction,
} = transactionsSlice.actions

export default transactionsSlice.reducer
