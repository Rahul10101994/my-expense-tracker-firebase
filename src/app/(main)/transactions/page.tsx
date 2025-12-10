'use client';

import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import type { Transaction } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TransactionForm } from './components/transaction-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function TransactionsPage() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'transactions'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newTransactions: Transaction[] = [];
      querySnapshot.forEach((doc) => {
        newTransactions.push({ id: doc.id, ...doc.data() } as Transaction);
      });
      const formattedTransactions = newTransactions.map(t => ({...t, date: new Date(t.date).toISOString()}))
      setTransactions(formattedTransactions);
    });

    return () => unsubscribe();
  }, []);

  const handleSuccess = () => {
    setDialogOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>
                Record a new income or expense.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[calc(100vh-10rem)]">
              <div className="py-4 pr-6">
                <TransactionForm onSuccess={handleSuccess} />
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={transactions} />
    </div>
  );
}
