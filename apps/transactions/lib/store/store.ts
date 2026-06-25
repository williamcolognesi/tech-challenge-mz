import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from './slices/transactionsSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      transactions: transactionsReducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
