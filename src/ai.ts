import log from "./logger";
import { Output } from "./types";

const generate = async (prompt: string, config: { apiKey: string }) => {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `\nTodo = ${prompt}\nRULES: Write the command (if needed, like \"go mod init\" or others, don't use Linux commands to create files/folders) and code block with the correct path+filename in this format, no duplicates, just write the JSON result (minified):\n\ninterface Output {\n  type: "file" | "command";\n  command?: string; // the command to run (if any)\n  filename?: string; // full filename with path\n  code?: string; // don't minify the code\n  description?: string; // write in Indonesian slang\n}\n\nWrite the objects sequentially, for example, create a cpp file first, then compile it, don't do it the other way around.\n\nExample JSON:\n\n[\n  {\n    "type": "file",\n    "filename": "src/main.cpp",\n    "code": "int main() { return 0; }",\n    "description": "File buat mulai main.cpp, isinya boilerplate code C++."\n  },\n  {\n    "type": "command",\n    "command": "g++ src/main.cpp -o main",\n    "description": "Compile file cpp yang baru aja dibuat."\n  }\n]`,
            },
            {
              role: "assistant",
              content: "This is the JSON code:\n```json\n[",
            },
          ],
          model: "llama-3.2-11b-text-preview", //"llama-3.1-70b-versatile",
          temperature: 0.3,
          max_tokens: 1500,
          top_p: 0.9,
          stream: false,
          stop: "```",
        }),
      },
    );
    const data = await response.json();
    const content = data.choices[0].message.content;
    log(content, "blue");
    const result: Output[] = JSON.parse("[" + content);
    return result;
  } catch (err) {
    throw new Error("Error cik\n > " + err);
  }
};

export default generate;
