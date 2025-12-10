import type { Transaction, Budget, DataPoint } from '@/lib/types';
import { ShoppingCart, Tv, Bus, Utensils, Droplets, Bolt } from 'lucide-react';

export const transactions: Transaction[] = [];

export const budgets: Budget[] = [
  { id: '1', name: 'Groceries', amount: 500, spent: 0, icon: ShoppingCart },
  { id: '2', name: 'Entertainment', amount: 150, spent: 0, icon: Tv },
  { id: '3', name: 'Transport', amount: 100, spent: 0, icon: Bus },
  { id: '4', name: 'Dining Out', amount: 200, spent: 0, icon: Utensils },
  { id: '5', name: 'Utilities', amount: 250, spent: 0, icon: Droplets },
  { id: '6', name: 'Subscriptions', amount: 50, spent: 0, icon: Bolt },
];

export const overviewData: DataPoint[] = [
    { month: 'Jan', income: 0, expenses: 0 },
    { month: 'Feb', income: 0, expenses: 0 },
    { month: 'Mar', income: 0, expenses: 0 },
    { month: 'Apr', income: 0, expenses: 0 },
    { month: 'May', income: 0, expenses: 0 },
    { month: 'Jun', income: 0, expenses: 0 },
    { month: 'Jul', income: 0, expenses: 0 },
];
