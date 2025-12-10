'use server';

/**
 * @fileOverview Generates a monthly financial summary with key metrics and insights, using the LLM to decide if relevant charts should be shown.
 *
 * - generateMonthlySummary - A function that generates the monthly financial summary.
 * - GenerateMonthlySummaryInput - The input type for the generateMonthlySummary function.
 * - GenerateMonthlySummaryOutput - The return type for the generateMonthlySummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMonthlySummaryInputSchema = z.object({
  income: z.number().describe('Total income for the month.'),
  expenses: z.number().describe('Total expenses for the month.'),
  budget: z.number().describe('Total budget for the month.'),
  savings: z.number().optional().describe('Total savings for the month, if available.'),
  debts: z.number().optional().describe('Total debts for the month, if available.'),
  previousMonthSummary: z.string().optional().describe('Summary of the previous month for comparison.'),
});

export type GenerateMonthlySummaryInput = z.infer<typeof GenerateMonthlySummaryInputSchema>;

const GenerateMonthlySummaryOutputSchema = z.object({
  summary: z.string().describe('A detailed summary of the monthly financial performance.'),
  showCharts: z.boolean().describe('Whether or not charts should be shown with the summary.'),
});

export type GenerateMonthlySummaryOutput = z.infer<typeof GenerateMonthlySummaryOutputSchema>;

export async function generateMonthlySummary(input: GenerateMonthlySummaryInput): Promise<GenerateMonthlySummaryOutput> {
  return generateMonthlySummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMonthlySummaryPrompt',
  input: {schema: GenerateMonthlySummaryInputSchema},
  output: {schema: GenerateMonthlySummaryOutputSchema},
  prompt: `You are a personal finance advisor. Generate a monthly financial summary based on the following data:

Income: {{income}}
Expenses: {{expenses}}
Budget: {{budget}}

{{#if savings}}Savings: {{savings}}{{/if}}
{{#if debts}}Debts: {{debts}}{{/if}}

{{#if previousMonthSummary}}Previous Month Summary: {{previousMonthSummary}}{{/if}}

Based on this information, provide a detailed summary of the monthly financial performance. Also, decide if charts should be shown to better visualize the data. Set the showCharts field to true if charts are appropriate, otherwise false. The summary should include key metrics and insights. Suggest potential actions the user can take to improve their finances.
`,
});

const generateMonthlySummaryFlow = ai.defineFlow(
  {
    name: 'generateMonthlySummaryFlow',
    inputSchema: GenerateMonthlySummaryInputSchema,
    outputSchema: GenerateMonthlySummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
