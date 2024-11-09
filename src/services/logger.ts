import chalk, { Chalk } from "chalk";

export default function log(message: string, color?: keyof typeof Chalk): void {
    const validColor = color && color in chalk ? chalk[color] : chalk.white;
    let messages = " " + message.replace(/\n/g, "\n ");
    console.log(validColor(messages));
}

export function logCode(code: string, filepath?: string) {
  // Helper function to get the available width for content
  const getContentWidth = () => getTerminalWidth() - 4; // Account for borders and spacing

  // Helper function to wrap text that exceeds terminal width
  const wrapText = (text: string, maxWidth: number): string[] => {
    if (text.length <= maxWidth) return [text];
    
    const lines: string[] = [];
    let currentLine = '';
    
    const words = text.split(' ');
    for (const word of words) {
      if ((currentLine + word).length > maxWidth) {
        if (currentLine) lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine += word + ' ';
      }
    }
    if (currentLine) lines.push(currentLine.trim());
    
    return lines;
  };

  // Split the code into lines
  const codes = code.split('\n');
  const contentWidth = getContentWidth();

  // Draw top border with optional filepath
  if (filepath) {
    const path = ` File Path : ${filepath} `;
    const remainingWidth = getTerminalWidth() - 7 - path.length;
    log(`╭───${chalk.blue(path)}${'─'.repeat(remainingWidth)}╮`);
  } else {
    log(`╭${'─'.repeat(contentWidth)}╮`);
  }

  // Process and output each line
  codes.forEach((codeLine) => {
    if (codeLine.length > contentWidth) {
      // Handle long lines by wrapping them
      const wrappedLines = wrapText(codeLine, contentWidth);
      wrappedLines.forEach((line) => {
        const padding = ' '.repeat(contentWidth - line.length-1);
        log(`│ ${line}${padding}│ `);
      });
    } else {
      // Handle normal lines
      const padding = ' '.repeat(contentWidth - codeLine.length-1);
      log(`│ ${codeLine}${padding}│ `);
    }
  });

  // Draw bottom border
  log(`╰${'─'.repeat(contentWidth)}╯`);
}


function getTerminalWidth() {
  return process.stdout.columns ||
    process.stderr.columns ||
    80; // default fallback width
}
