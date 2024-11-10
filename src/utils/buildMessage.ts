import type { Message } from "../types";

export function buildMessage(
  prompt: string,
  instruction: string,
  history: Message[],
) {
  const message: Message[] = [
    {
      role: "system",
      content: instruction,
    },
    ...history,
    {
      role: "user",
      content: prompt + "\nharus ada [FILEPATH] [KODE] [KETERANGAN]",
    },
  ];
  return message;
}
