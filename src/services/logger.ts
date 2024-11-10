import chalk from "chalk";
import gitDiff from "git-diff";

export default function log(message: string, color?: keyof typeof chalk): void {
  // Check if the color exists in chalk and is a callable function
  const validColor =
    color && typeof chalk[color] === "function"
      ? (chalk[color] as (...args: string[]) => string)
      : chalk.white;

  let messages = " " + message.replace(/\n/g, "\n ");
  console.log(validColor(messages));
}

export function logCode(code: string, filepath?: string, refactoredCode?: string) {
  const getTerminalWidth = (): number => process.stdout.columns || process.stderr.columns || 80;

  const getContentWidth = (): number => getTerminalWidth() - 4;

  const wrapText = (text: string, maxWidth: number): string[] => {
    if (text.length <= maxWidth) return [text];

    const lines: string[] = [];
    let currentLine = "";

    const words = text.split(" ");
    for (const word of words) {
      if ((currentLine + word).length > maxWidth) {
        if (currentLine) lines.push(currentLine.trim());
        currentLine = word + " ";
      } else {
        currentLine += word + " ";
      }
    }
    if (currentLine) lines.push(currentLine.trim());

    return lines;
  };

  const codes = code
    .replace(/```(.*?)\n/g, "")
    .replace(/```/g, "")
    .split("\n");

  const contentWidth = getContentWidth();

  if (filepath) {
    const path = ` File Path : ${filepath} `;
    const remainingWidth = getTerminalWidth() - 7 - path.length;
    console.log(`─────${chalk.cyan.bold(path)}${"─".repeat(Math.max(0, remainingWidth))}──`);
  } else {
    console.log(`──${"─".repeat(contentWidth)}──`);
  }

  if (!refactoredCode) {
    codes.forEach((codeLine) => {
      if (codeLine.length > contentWidth) {
        const wrappedLines = wrapText(codeLine, contentWidth);
        wrappedLines.forEach((line) => {
          const padding = " ".repeat(Math.max(0, contentWidth - line.length));
          console.log(`  ${chalk.green(line)}${padding}`);
        });
      } else {
        const padding = " ".repeat(Math.max(0, contentWidth - codeLine.length));
        console.log(`  ${chalk.green(codeLine)}${padding}`);
      }
    });
  } else {
    const refactored = refactoredCode
      .replace(/```(.*?)\n/g, "")
      .replace(/```/g, "")

    console.log(gitDiff(code, refactored,{wordDiff:true,color:true}))
  }

  console.log(`──${"─".repeat(Math.max(0, contentWidth))}──`);
}

function createBlockDiff(oldStr: string, newStr: string): void {
  const oldLines = oldStr.trim().split('\n');
  const newLines = newStr.trim().split('\n');

  let startDiff = 0;
  let endOldDiff = oldLines.length - 1;
  let endNewDiff = newLines.length - 1;

  while (startDiff < oldLines.length && startDiff < newLines.length
         && oldLines[startDiff] === newLines[startDiff]) {
    startDiff++;
  }

  while (endOldDiff > startDiff && endNewDiff > startDiff
         && oldLines[endOldDiff] === newLines[endNewDiff]) {
    endOldDiff--;
    endNewDiff--;
  }

  console.log(chalk.cyan(`@@ -${startDiff+1},${endOldDiff-startDiff+1} +${startDiff+1},${endNewDiff-startDiff+1} @@\n`));

  const contextBefore = Math.max(0, startDiff - 3);
  for (let i = contextBefore; i < startDiff; i++) {
    console.log(` ${oldLines[i]}`);
  }

  for (let i = startDiff; i <= endOldDiff; i++) {
    console.log(chalk.red(`-${oldLines[i]}`));
  }

  for (let i = startDiff; i <= endNewDiff; i++) {
    console.log(chalk.green(`+${newLines[i]}`));
  }

  const contextAfter = Math.min(oldLines.length, endOldDiff + 4);
  for (let i = endOldDiff + 1; i < contextAfter; i++) {
    console.log(` ${oldLines[i]}`);
  }
}
