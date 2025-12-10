export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: 'Groceries' | 'Salary' | 'Utilities' | 'Entertainment' | 'Transport' | 'Other';
};

export type Budget = {
  id: string;
  name: string;
  amount: number;
  spent: number;
  icon: React.ElementType;
};

export type DataPoint = {
  month: string;
  income: number;
  expenses: number;
};
