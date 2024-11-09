/**
  * Parses text with markdown-style key-value pairs in the format:
  *
  * [key]: value
  *
  * @param input The text to parse
  * @returns A dictionary with the parsed keys and values
*/
export function parseText(input: string) {
  const component: Record<string, string> = {};
  const regex = /\[([^\]]+)\]:\s*(.*?)(?=\n\[[^\]]+\]:|$)/gs;

  let match;

  while ((match = regex.exec(input)) !== null) {
    const key = match[1].toLowerCase();
    const value = match[2].trim();
    component[key] = value.replace(/```(.*?)\n/, "").replace("```", "");
  }
  return component;
}
