import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const totalIncome = income.reduce(
      (total, { value }: { value: number }) => total + value,
      0,
    );

    const outcome = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const totalOutcome = outcome.reduce(
      (total, { value }: { value: number }) => total + value,
      0,
    );

    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
