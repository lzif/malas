// types.ts
export type Command = "bikin" | "rapiin" | "jelasin" | "test" | "bikin-docs";

export interface UserPrompt {
  command: Command;
  prompt: string;
}
