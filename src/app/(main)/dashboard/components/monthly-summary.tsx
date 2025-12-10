'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, Loader2 } from 'lucide-react';
import { generateSummaryAction } from '@/app/actions';
import type { GenerateMonthlySummaryOutput } from '@/ai/flows/generate-monthly-summary';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const formSchema = z.object({
  income: z.coerce.number().min(0, 'Income must be a positive number.'),
  expenses: z.coerce.number().min(0, 'Expenses must be a positive number.'),
  budget: z.coerce.number().min(0, 'Budget must be a positive number.'),
});

type FormValues = z.infer<typeof formSchema>;

export function MonthlySummary() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<GenerateMonthlySummaryOutput | null>(null);
  const [formValues, setFormValues] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: 5800,
      expenses: 4500,
      budget: 5000,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setSummary(null);
    setFormValues(values);
    const result = await generateSummaryAction(values);
    if (result.success && result.data) {
      setSummary(result.data);
    } else {
      // Handle error, e.g., show a toast notification
      console.error(result.error);
    }
    setIsLoading(false);
  }

  const chartData = formValues ? [
    { name: 'Expenses', value: formValues.expenses },
    { name: 'Savings (Income - Expenses)', value: Math.max(0, formValues.income - formValues.expenses) },
  ] : [];
  const budgetChartData = formValues ? [
    { name: 'Spent', value: formValues.expenses },
    { name: 'Remaining (Budget - Spent)', value: Math.max(0, formValues.budget - formValues.expenses) },
  ] : [];
  const COLORS = ['hsl(var(--chart-2))', 'hsl(var(--chart-1))'];
  
  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Monthly Financial Summary</CardTitle>
            <CardDescription>Generate an AI-powered summary of your finances.</CardDescription>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="income"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Income</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 5000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expenses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Expenses</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 3500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Budget</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 4000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Summary
                </Button>
              </form>
            </Form>

            {isLoading && (
              <div className="mt-6 text-center">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                <p className="mt-2 text-muted-foreground">Generating your summary...</p>
              </div>
            )}

            {summary && (
              <div className="mt-6 space-y-6">
                <Card className="bg-secondary/50">
                  <CardHeader>
                    <CardTitle>AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{summary.summary}</p>
                  </CardContent>
                </Card>

                {summary.showCharts && formValues && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Income vs. Expenses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Budget vs. Spending</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <PieChart>
                            <Pie data={budgetChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                               {budgetChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
