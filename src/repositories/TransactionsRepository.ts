import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
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
    let balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const totalIncome = this.transactions.reduce((total, transactions) => {
      if (transactions.type === 'income') {
        return total + transactions.value;
      }

      return total;
    }, 0);

    const totalOutcome = this.transactions.reduce((total, transactions) => {
      if (transactions.type === 'outcome') {
        return total + transactions.value;
      }

      return total;
    }, 0);

    balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
