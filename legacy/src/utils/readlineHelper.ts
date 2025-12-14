import readline from "readline";

export const ask = (question: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
};

export const yOrN = (question: string): Promise<boolean> => {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdout.write(`${question} (y/n): `);

  return new Promise((resolve) => {
    const handleKeyPress = (key: Buffer) => {
      const char = key.toString().toLowerCase();
      if (char === "y" || char === "n") {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdin.off("data", handleKeyPress);
        process.stdout.write("\n");
        resolve(char === "y");
      }
    };

    process.stdin.on("data", handleKeyPress);
  });
};
