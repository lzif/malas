import {
  Content,
  DynamicRetrievalMode,
  GoogleGenerativeAI,
  Part,
} from "@google/generative-ai";
import type { Config } from "../config";
import ora from "ora";

function getGenerativeModelConfig(instruction: string | Part | Content) {
  return {
    model: "gemini-1.5-flash-8b",
    systemInstruction: instruction,
  };
}

export default async function generate(
  instruction: string | Part | Content,
  prompt: string,
  config: Config,
  history?: Content[],
): Promise<string> {
  const spinner = ora({
    text: "Bentar, mikir dulu...",
    spinner: "bouncingBar",
    color: "green",
  }).start();

  try {
    const genAI = new GoogleGenerativeAI(config.apiKey);
    const model = genAI.getGenerativeModel(
      getGenerativeModelConfig(instruction),
    );

    const chatSession = model.startChat({
      generationConfig: config.generationConfig,
      history,
    });

    const result = await chatSession.sendMessage(prompt);
    spinner.stop();
    return result.response.text();
  } catch (err) {
    spinner.fail(" Gagal membuat kode, maaf :(");
    if (err instanceof Error) {
      console.error(err);
      throw new Error("Error cik: \n" + err.message);
    } else {
      throw new Error(" AI nya error jir, mungkin lagi malas mikir");
    }
  }
}
