'use server';

import { generateMonthlySummary, type GenerateMonthlySummaryInput } from '@/ai/flows/generate-monthly-summary';

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
