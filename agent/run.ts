import * as path from 'path';
import * as dotenv from 'dotenv';
import { readFailures } from './reader';
import { analyseFailures } from './analyst';
import { writeReport } from './reporter';

// Load .env file so ANTHROPIC_API_KEY is available
dotenv.config();

async function main() {
  console.log('🤖 Playwright AI Agent starting...\n');

  // Step 1 — Reader: extract failures from results.json
  const resultsPath = path.join(process.cwd(), 'test-results', 'results.json');
  const failures = readFailures(resultsPath);

  if (failures.length === 0) {
    console.log('✅ All tests passed. No failures to analyse.');
    writeReport([]);
    return;
  }

  console.log(`❌ Found ${failures.length} failure(s). Sending to Claude...\n`);

  // Step 2 — Analyst: send failures to Claude, get diagnoses back
  const analyses = await analyseFailures(failures);

  // Step 3 — Reporter: write diagnoses to markdown file
  writeReport(analyses);

  console.log('\n🏁 Agent complete.');
}

// Run the main function
main().catch(console.error);