export type CommandName =
  | "bikin"
  | "rapiin"
  | "jelasin"
  | "test"
  | "bikin-docs"
  | "bikin-project";

export interface UserPrompt {
  command: Command;
  prompt: string;
}

export interface CommandArg {
  name: string;
  description: string;
  optional?: boolean;
}

export interface Command {
  name: CommandName;
  emoji: string;
  description: string;
  args: CommandArg[];
}

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatOptions {
  temperature?: number;
  top_p?: number;
  top_k?: number;
  max_tokens?: number;
}

export interface ChatResponse {
  success: boolean;
  answer?: any;
  error?: string;
}
