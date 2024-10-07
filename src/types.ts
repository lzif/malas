export interface Output {
  type: "file" | "command";
  command?: string;
  filename?: string;
  code?: string;
  description?: string;
}
