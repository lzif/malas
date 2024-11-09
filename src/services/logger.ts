const colors: { [key: string]: string } = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

/**
 * Logs a message to the console with an optional color.
 */
export default function log(
  message: string,
  color: keyof typeof colors = "reset",
): void {
  let messages = " " + message.replace("\n","\n ")
  const colorCode = colors[color] || colors.reset;
  console.log(`${colorCode}%s${colors.reset}`, messages);
}
