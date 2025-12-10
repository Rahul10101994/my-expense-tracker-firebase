'use server';

import { generateMonthlySummary, type GenerateMonthlySummaryInput } from '@/ai/flows/generate-monthly-summary';
import { adminDb } from '@/lib/firebase-admin';
import type { Transaction, Budget } from '@/lib/types';
import { budgets } from '@/lib/data';

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
  try {
    const docRef = await adminDb.collection('transactions').add(transaction);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding transaction:', error);
    return { success: false, error: 'Failed to add transaction.' };
  }
}

export async function getTransactions(): Promise<Transaction[]> {
  try {
    const snapshot = await adminDb.collection('transactions').orderBy('date', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
  } catch (error) {
    console.error('Error getting transactions:', error);
    return [];
  }
}

export async function addBudget(budget: Omit<Budget, 'id' | 'spent' | 'icon'>) {
    try {
        const docRef = await adminDb.collection('budgets').add(budget);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding budget:', error);
        return { success: false, error: 'Failed to add budget.' };
    }
}

export async function getBudgets(): Promise<Budget[]> {
    try {
        const budgetsSnapshot = await adminDb.collection('budgets').get();
        const transactionsSnapshot = await adminDb.collection('transactions').where('type', '==', 'expense').get();
        
        const expensesByCategory: Record<string, number> = {};
        transactionsSnapshot.forEach(doc => {
            const transaction = doc.data() as Omit<Transaction, 'id'>;
            if (transaction.category) {
                expensesByCategory[transaction.category] = (expensesByCategory[transaction.category] || 0) + transaction.amount;
            }
        });

        const firestoreBudgets = budgetsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Omit<Budget, 'icon' | 'spent'>));

        const newBudgets = firestoreBudgets.map(fb => {
            const base = budgets.find(b => b.name === fb.name);
            return {
                ...fb,
                spent: expensesByCategory[fb.name] || 0,
                icon: base?.icon,
            }
        });
        
        return newBudgets as Budget[];
    } catch (error) {
        console.error('Error getting budgets:', error);
        return [];
    }
}
