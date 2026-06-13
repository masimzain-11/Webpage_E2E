import * as fs from 'fs';
import * as path from 'path';
import { AnalysisResult } from './analyst';

export function writeReport(analyses: AnalysisResult[]): void {
  // Create the agent-reports folder if it doesn't exist
  const reportsDir = path.join(process.cwd(), 'agent-reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
  }

  // If no failures were analysed, write a passing report
  if (analyses.length === 0) {
    const content = `# ✅ AI Test Analysis Report\n\nAll tests passed. No failures to analyse.\n`;
    fs.writeFileSync(path.join(reportsDir, 'failure-report.md'), content);
    console.log('✅ Report written: agent-reports/failure-report.md');
    return;
  }

  // Build the markdown report line by line
  const lines: string[] = [];

  lines.push('# ❌ AI Test Failure Analysis Report');
  lines.push(`\n**Total failures:** ${analyses.length}`);
  lines.push(`\n**Generated:** ${new Date().toISOString()}\n`);
  lines.push('---\n');

  for (const analysis of analyses) {
    lines.push(`## 🔴 ${analysis.testName}`);
    lines.push(`\n${analysis.diagnosis}\n`);
    lines.push('---\n');
  }

  // Join all lines into one string and write to file
  const content = lines.join('\n');
  fs.writeFileSync(path.join(reportsDir, 'failure-report.md'), content);
  console.log('📄 Report written: agent-reports/failure-report.md');
}