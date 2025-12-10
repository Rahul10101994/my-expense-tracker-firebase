import type { Transaction, Budget, DataPoint } from '@/lib/types';
import { ShoppingCart, Tv, Bus, Utensils, Droplets, Bolt } from 'lucide-react';

export const transactions: Transaction[] = [
  { id: '1', date: '2024-07-25', description: 'Grocery Store', category: 'Groceries', amount: 75.6, type: 'expense' },
  { id: '2', date: '2024-07-25', description: 'Monthly Salary', category: 'Salary', amount: 5000, type: 'income' },
  { id: '3', date: '2024-07-24', description: 'Electricity Bill', category: 'Utilities', amount: 120, type: 'expense' },
  { id: '4', date: '2024-07-23', description: 'Movie Tickets', category: 'Entertainment', amount: 30, type: 'expense' },
  { id: '5', date: '2024-07-22', description: 'Bus Fare', category: 'Transport', amount: 5, type: 'expense' },
  { id: '6', date: '2024-07-21', description: 'Restaurant Dinner', category: 'Groceries', amount: 55, type: 'expense' },
  { id: '7', date: '2024-07-20', description: 'Freelance Project', category: 'Salary', amount: 800, type: 'income' },
];

export const budgets: Budget[] = [
  { id: '1', name: 'Groceries', amount: 500, spent: 280.5, icon: ShoppingCart },
  { id: '2', name: 'Entertainment', amount: 150, spent: 90, icon: Tv },
  { id: '3', name: 'Transport', amount: 100, spent: 65, icon: Bus },
  { id: '4', name: 'Dining Out', amount: 200, spent: 175, icon: Utensils },
  { id: '5', name: 'Utilities', amount: 250, spent: 180, icon: Droplets },
  { id: '6', name: 'Subscriptions', amount: 50, spent: 45, icon: Bolt },
];

export const overviewData: DataPoint[] = [
    { month: 'Jan', income: 4000, expenses: 2400 },
    { month: 'Feb', income: 3000, expenses: 1398 },
    { month: 'Mar', income: 5000, expenses: 6800 },
    { month: 'Apr', income: 2780, expenses: 3908 },
    { month: 'May', income: 1890, expenses: 4800 },
    { month: 'Jun', income: 2390, expenses: 3800 },
    { month: 'Jul', income: 3490, expenses: 4300 },
];
