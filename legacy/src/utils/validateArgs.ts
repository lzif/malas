import type { CommandArg } from "../types";
import { validateFilePath } from "../services/file";
interface ValidatedArgs {
  prompt?: string;
  filepath?: string;
  [key: string]: string | undefined;
}

export async function validateArgs(
  commandArgs: CommandArg[],
  inputArgs: string[],
): Promise<ValidatedArgs> {
  const validatedArgs: ValidatedArgs = {};
  const validArgs = inputArgs.filter((arg): arg is string => arg !== undefined);

  // Jika tidak ada arguments, return empty object
  if (validArgs.length === 0) {
    return validatedArgs;
  }

  // Fungsi helper untuk validasi tiap tipe argument
  const isFilePath = async (arg: string): Promise<boolean> => {
    try {
      await validateFilePath(arg);
      return true;
    } catch {
      return false;
    }
  };

  const isPrompt = (arg: string): boolean => {
    return arg.trim().length > 0;
  };

  // Validasi arguments dengan flexible order
  for (const arg of validArgs) {
    if (await isFilePath(arg)) {
      validatedArgs.filepath = await validateFilePath(arg);
    } else if (isPrompt(arg)) {
      validatedArgs.prompt = arg.trim();
    } else {
      throw new Error(`Invalid argument: ${arg}`);
    }
  }

  // Validasi required arguments
  const requiredArgs = commandArgs.filter((arg) => !arg.optional);
  for (const reqArg of requiredArgs) {
    if (reqArg.name === "filepath" && !validatedArgs.filepath) {
      throw new Error("Missing required filepath argument");
    }
    if (reqArg.name === "prompt" && !validatedArgs.prompt) {
      throw new Error("Missing required prompt argument");
    }
  }

  return validatedArgs;
}
