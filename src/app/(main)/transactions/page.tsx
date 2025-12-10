'use client';

import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { getTransactions, addTransaction } from '@/app/actions';
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

export default function TransactionsPage() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    const newTransactions = await getTransactions();
    const formattedTransactions = newTransactions.map(t => ({...t, date: new Date(t.date).toISOString()}))
    setTransactions(formattedTransactions);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSuccess = () => {
    setDialogOpen(false);
    fetchTransactions();
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
