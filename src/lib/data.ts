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
