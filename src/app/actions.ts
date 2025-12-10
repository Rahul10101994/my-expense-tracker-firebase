'use server';

import { generateMonthlySummary, type GenerateMonthlySummaryInput } from '@/ai/flows/generate-monthly-summary';
import type { Transaction, Budget } from '@/lib/types';
import { budgets } from '@/lib/data';

// Note: The database interactions have been moved to client-side components 
// to work directly with Firestore using the client SDK. These server actions 
// are now simplified or can be removed if all data logic is handled on the client.

export async function generateSummaryAction(input: GenerateMonthlySummaryInput) {
  try {
    const result = await generateMonthlySummary(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating summary:', error);
    return { success: false, error: 'Failed to generate summary.' };
  }
}

export async function addTransaction(transaction: Omit<Transaction, 'id'>) {
  // This is now handled client-side. This function can be kept for other server-side logic or removed.
  console.log('addTransaction server action called (can be removed)');
  return { success: true };
}

export async function getTransactions(): Promise<Transaction[]> {
  // This is now handled client-side.
  console.log('getTransactions server action called (can be removed)');
  return [];
}

export async function addBudget(budget: Omit<Budget, 'id' | 'spent' | 'icon'>) {
  // This is now handled client-side.
  console.log('addBudget server action called (can be removed)');
  return { success: true };
}

export async function getBudgets(): Promise<Budget[]> {
    // This is now handled client-side.
    console.log('getBudgets server action called (can be removed)');
    return [];
}
