'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addBudget } from '@/app/actions';

const budgetFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Category name must be at least 2 characters.',
  }),
  amount: z.coerce.number().positive({ message: 'Amount must be positive.' }),
});

type BudgetFormValues = z.infer<typeof budgetFormSchema>;

export function BudgetForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetFormSchema),
  });

  async function onSubmit(values: BudgetFormValues) {
    const result = await addBudget(values);
    if (result.success) {
        alert('Budget submitted!');
        onSuccess?.();
    } else {
        alert(`Error: ${result.error}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Groceries">Groceries</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Dining Out">Dining Out</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Subscriptions">Subscriptions</SelectItem>
                  </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 500" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Add Budget
        </Button>
      </form>
    </Form>
  );
}
