import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export const runCommand = async (command: string): Promise<void> => {
  try {
    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }

    console.log(`Output:\n${stdout}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};
