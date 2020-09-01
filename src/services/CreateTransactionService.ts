import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    if (transaction.type === 'outcome' && transaction.value > balance.total) {
      throw Error('The outcome value is bigger than the total');
    }

    return transaction;
  }
}

export default CreateTransactionService;
