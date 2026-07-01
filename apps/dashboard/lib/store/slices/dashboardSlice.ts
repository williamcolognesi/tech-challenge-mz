import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit'
import type { ITransaction } from '@/features/transactions/model/transaction.types'
import type { IEnums } from '@/features/transactions/dto/enums.dto'

export interface RevenueVsExpense {
  month: string
  receitas: number
  despesas: number
}

export interface ExpenseByCategory {
  name: string
  value: number
  count: number
  color: string
}

interface DashboardState {
  balance: number
  income: number
  expense: number
  recentTransactions: ITransaction[]
  revenueVsExpenses: RevenueVsExpense[]
  expensesByCategory: ExpenseByCategory[]
  enums: IEnums | null
}

const initialState: DashboardState = {
  balance: 0,
  income: 0,
  expense: 0,
  recentTransactions: [],
  revenueVsExpenses: [],
  expensesByCategory: [],
  enums: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData: (state, action: PayloadAction<Omit<DashboardState, 'enums'>>) => {
      state.balance = action.payload.balance
      state.income = action.payload.income
      state.expense = action.payload.expense
      state.recentTransactions = action.payload.recentTransactions
      state.revenueVsExpenses = action.payload.revenueVsExpenses
      state.expensesByCategory = action.payload.expensesByCategory
    },
    setEnums: (state, action: PayloadAction<IEnums>) => {
      state.enums = action.payload
    },
  },
})

// Selectors
const selectDashboardState = (state: { dashboard: DashboardState }) => state.dashboard

export const selectBalance = createSelector(selectDashboardState, (s) => s.balance)
export const selectIncome = createSelector(selectDashboardState, (s) => s.income)
export const selectExpense = createSelector(selectDashboardState, (s) => s.expense)
export const selectRecentTransactions = createSelector(selectDashboardState, (s) => s.recentTransactions)
export const selectRevenueVsExpenses = createSelector(selectDashboardState, (s) => s.revenueVsExpenses)
export const selectExpensesByCategory = createSelector(selectDashboardState, (s) => s.expensesByCategory)
export const selectEnums = createSelector(selectDashboardState, (s) => s.enums)

export const { setDashboardData, setEnums } = dashboardSlice.actions
export default dashboardSlice.reducer
