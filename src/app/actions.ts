'use server';

import { generateMonthlySummary, type GenerateMonthlySummaryInput } from '@/ai/flows/generate-monthly-summary';

export async function generateSummaryAction(input: GenerateMonthlySummaryInput) {
  try {
    const result = await generateMonthlySummary(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate summary.' };
  }
}
