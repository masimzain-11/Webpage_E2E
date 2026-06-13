import Anthropic from '@anthropic-ai/sdk';
import { TestFailure } from './reader';

// This is what the analyst sends back after Claude responds
export interface AnalysisResult {
  testName: string;
  diagnosis: string;
}

// This function takes failures, sends each one to Claude, gets a diagnosis back
export async function analyseFailures(failures: TestFailure[]): Promise<AnalysisResult[]> {
  // Create the Anthropic client — this is the "phone" that connects to Claude
  // It automatically reads ANTHROPIC_API_KEY from your environment
  const client = new Anthropic();

  const results: AnalysisResult[] = [];

  for (const failure of failures) {
    console.log(`🔍 Analysing: ${failure.testName}...`);

    // This is the message we send to Claude — exactly like typing in Claude.ai
    // but from code
    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are a senior QA engineer reviewing a Playwright test failure.

Test name: ${failure.testName}
File: ${failure.filePath}
Error message: ${failure.errorMessage}

Give me:
1. What broke (in one sentence, plain English)
2. Most likely root cause (in one sentence)
3. Suggested fix (in 2-3 sentences, specific and actionable)

Be concise. No fluff.`,
        },
      ],
    });

    // Claude's response comes back as an array of content blocks
    // We grab the first text block — that's the diagnosis
    const diagnosis =
      message.content[0].type === 'text'
        ? message.content[0].text
        : 'Could not generate diagnosis';

    results.push({
      testName: failure.testName,
      diagnosis,
    });
  }

  return results;
}