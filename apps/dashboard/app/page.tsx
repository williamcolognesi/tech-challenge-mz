import { DashboardContent } from '../components/dashboard-content';
import { TRANSACTION_DIRECTION } from '@/features/transactions/model/constants';
import { getBalance } from '@/features/transactions/api/queries/getBalance';
import { getRecentTransactions } from '@/features/transactions/api/queries/getRecentTransactions';
import { getRevenueVsExpenses } from '@/features/transactions/api/queries/getRevenueVsExpenses';
import { getExpensesByCategory } from '@/features/transactions/api/queries/getExpensesByCategory';
import { getEnums } from '@/features/transactions/api/queries/getEnums';

export default async function DashboardPage() {
  const [balance, income, expense, recentTransactions, revenueVsExpenses, expensesByCategory, enums] =
    await Promise.all([
      getBalance(),
      getBalance({ direcao: TRANSACTION_DIRECTION.ENTRADA.codigo }),
      getBalance({ direcao: TRANSACTION_DIRECTION.SAIDA.codigo }),
      getRecentTransactions(),
      getRevenueVsExpenses(),
      getExpensesByCategory(),
      getEnums(),
    ]);

  return (
    <DashboardContent
      balance={balance}
      income={income}
      expense={expense}
      recentTransactions={recentTransactions}
      revenueVsExpenses={revenueVsExpenses}
      expensesByCategory={expensesByCategory}
      enums={enums}
    />
  );
}
