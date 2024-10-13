export const exampleAIResult = `
filename: "hello_world.py"
\`\`\`python
# This is a simple Python program that prints "hello" to the console.

def main():
    """Prints a hello message."""
    print("hello")

if __name__ == "__main__":
    main()
\`\`\`

filename: "another_file.js"
\`\`\`javascript
// This is a simple JavaScript program that prints "hello" to the console.

function main() {
    console.log("hello");
}

main();
\`\`\`
`;

const regex = /filename:\s*"([^"]+)"\s*```(\w+)([\s\S]*?)```/g;

export type ParseResult = {
  filename: string;
  language: string;
  code: string;
  lineCount: number;
}

export default function parse(result: string): ParseResult[] {
  const matches = [];
  let match;
  while ((match = regex.exec(result)) !== null) {
    const filename = match[1];
    const language = match[2];
    const code = match[3].trim();
    matches.push({ filename, language, code, lineCount: code.split(/\r\n|\r|\n/).length });
  }
  return matches
}
