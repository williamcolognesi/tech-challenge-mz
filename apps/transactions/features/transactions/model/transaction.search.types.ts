import type { TransactionCategory, TransactionDirection, TransactionType } from "./transaction.types";
import type { IPageParams } from "./page.types";

export interface ITransactionSearch {
  tipo?: TransactionType;
  direcao?: TransactionDirection;
  categoria?: TransactionCategory;
  semCategoria?: boolean;
  descricao?: string;
  dataInicio?: Date;
  dataFim?: Date;
}

export interface ITransactionPageParams extends ITransactionSearch, IPageParams {}