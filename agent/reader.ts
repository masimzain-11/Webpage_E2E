import * as fs from 'fs';
import * as path from 'path';

export interface TestFailure {
  testName: string;
  errorMessage: string;
  filePath: string;
}

// This function digs through one suite and collects failures
// If it finds nested suites inside, it calls itself again on each one
// That's what "recursive" means — the function calls itself
function extractFromSuite(suite: any, failures: TestFailure[]): void {
  // If this suite has specs (actual test cases), check them for failures
  for (const spec of suite.specs || []) {
    for (const test of spec.tests || []) {
      for (const result of test.results || []) {
        if (result.status === 'failed' || result.status === 'timedOut') {
          failures.push({
            testName: spec.title,
            errorMessage: result.error?.message || 'No error message captured',
            filePath: spec.file || suite.file || 'Unknown file',
          });
        }
      }
    }
  }

  // If this suite has nested suites inside it, dig into each one
  // This is the recursive part — calling itself on the child suite
  for (const childSuite of suite.suites || []) {
    extractFromSuite(childSuite, failures);
  }
}

export function readFailures(resultsPath: string): TestFailure[] {
  if (!fs.existsSync(resultsPath)) {
    console.log('No results file found. Tests may not have run yet.');
    return [];
  }

  const raw = fs.readFileSync(resultsPath, 'utf-8');
  const results = JSON.parse(raw);

  const failures: TestFailure[] = [];

  // Start at the top level and dig into every suite
  for (const suite of results.suites || []) {
    extractFromSuite(suite, failures);
  }

  return failures;
}