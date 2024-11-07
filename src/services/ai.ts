import {
  Content,
  DynamicRetrievalMode,
  GoogleGenerativeAI,
  Part,
} from "@google/generative-ai";
import type { Config } from "../config";

function getGenerativeModelConfig(instruction: string | Part | Content) {
  return {
    model: "gemini-1.5-flash-8b",
    systemInstruction: instruction,
    //tools: [
    //  {
    //    googleSearchRetrieval: {
    //      dynamicRetrievalConfig: {
    //        mode: DynamicRetrievalMode.MODE_DYNAMIC,
    //        dynamicThreshold: 0.5,
    //      },
    //    },
    //  },
    //],
  };
}

export default async function generate(
  instruction: string | Part | Content,
  prompt: string,
  config: Config,
  history?: Content[],
): Promise<string> {
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
    return result.response.text();
  } catch (err) {
    if (err instanceof Error){
      console.error(err)
      throw new Error(err.message)
    } else {
    throw new Error(" AI nya error jir, mungkin lagi malas mikir");
    }
  }
}
