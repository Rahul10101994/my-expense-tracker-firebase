'use client';

import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BudgetCard } from './components/budget-card';
import type { Budget, Transaction } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BudgetForm } from './components/budget-form';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { budgets as defaultBudgets } from '@/lib/data';

export default function BudgetsPage() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [budgets, setBudgets] = useState<Budget[]>([]);

    useEffect(() => {
        const budgetsUnsubscribe = onSnapshot(collection(db, 'budgets'), (budgetsSnapshot) => {
            const firestoreBudgets = budgetsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Omit<Budget, 'icon' | 'spent'>));

            const expensesUnsubscribe = onSnapshot(collection(db, 'transactions'), (transactionsSnapshot) => {
                const expensesByCategory: Record<string, number> = {};
                transactionsSnapshot.forEach(doc => {
                    const transaction = doc.data() as Omit<Transaction, 'id'>;
                    if (transaction.type === 'expense' && transaction.category) {
                        expensesByCategory[transaction.category] = (expensesByCategory[transaction.category] || 0) + transaction.amount;
                    }
                });

                const newBudgets = firestoreBudgets.map(fb => {
                    const base = defaultBudgets.find(b => b.name === fb.name);
                    return {
                        ...fb,
                        spent: expensesByCategory[fb.name] || 0,
                        icon: base?.icon,
                    } as Budget;
                }).filter(b => b.icon); // ensure icon exists
                setBudgets(newBudgets);
            });
            return () => expensesUnsubscribe();
        });

        return () => budgetsUnsubscribe();
    }, []);

    const handleSuccess = () => {
        setDialogOpen(false);
    }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Budget
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Add Budget</DialogTitle>
                <DialogDescription>
                    Set a spending limit for a new category.
                </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <BudgetForm onSuccess={handleSuccess} />
                </div>
            </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {budgets.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </div>
    </div>
  );
}
