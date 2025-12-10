'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { transactions } from '@/lib/data';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { TransactionForm } from './components/transaction-form';

export default function TransactionsPage() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Transaction</SheetTitle>
              <SheetDescription>
                Record a new income or expense.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <TransactionForm onSuccess={() => setSheetOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <DataTable columns={columns} data={transactions} />
    </div>
  );
}
