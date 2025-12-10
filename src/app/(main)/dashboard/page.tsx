'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DollarSign,
  Wallet,
  TrendingUp,
  TrendingDown,
  PlusCircle,
} from 'lucide-react';
import { OverviewChart } from './components/overview-chart';
import { MonthlySummary } from './components/monthly-summary';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TransactionForm } from '../transactions/components/transaction-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Transaction, DataPoint } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';


export default function DashboardPage() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [overviewData, setOverviewData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'transactions'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newTransactions: Transaction[] = [];
      querySnapshot.forEach((doc) => {
        newTransactions.push({ id: doc.id, ...doc.data() } as Transaction);
      });
      const formattedTransactions = newTransactions.map(t => ({...t, date: new Date(t.date).toISOString()}))
      setTransactions(formattedTransactions);

      // Process data for overview chart
      const monthlyData: DataPoint[] = [
        { month: 'Jan', income: 0, expenses: 0 },
        { month: 'Feb', income: 0, expenses: 0 },
        { month: 'Mar', income: 0, expenses: 0 },
        { month: 'Apr', income: 0, expenses: 0 },
        { month: 'May', income: 0, expenses: 0 },
        { month: 'Jun', income: 0, expenses: 0 },
        { month: 'Jul', income: 0, expenses: 0 },
        { month: 'Aug', income: 0, expenses: 0 },
        { month: 'Sep', income: 0, expenses: 0 },
        { month: 'Oct', income: 0, expenses: 0 },
        { month: 'Nov', income: 0, expenses: 0 },
        { month: 'Dec', income: 0, expenses: 0 },
      ];

      formattedTransactions.forEach(transaction => {
        const month = new Date(transaction.date).getMonth();
        if (transaction.type === 'income') {
          monthlyData[month].income += transaction.amount;
        } else {
          monthlyData[month].expenses += transaction.amount;
        }
      });
      setOverviewData(monthlyData);
    });

    return () => unsubscribe();
  }, []);

  const handleSuccess = () => {
    setDialogOpen(false);
  }

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setDialogOpen(true)}>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalIncome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Calculated from your transactions.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalExpenses.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Calculated from your transactions.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${balance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Current account balance
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$10,000</div>
            <p className="text-xs text-muted-foreground">75% of goal reached</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <OverviewChart data={overviewData} />
        </div>
        <div className="lg:col-span-2">
          <MonthlySummary />
        </div>
      </div>
    </div>
  );
}
