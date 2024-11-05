import fs from "fs";
import path from "path";
import { writeFile } from "./services/file";
import log from "./services/logger";
import { ask } from "./utils/readlineHelper";

interface GenerationConfig {
  temperature: number;
  topK: number;
  topP: number;
  maxOutputTokens: number;
  responseMimeType: string;
}

export interface Config {
  apiKey: string;
  generationConfig: GenerationConfig;
}

export const getConfig = async (): Promise<Config> => {
  const configPath = path.resolve(
    process.env.HOME || process.env.USERPROFILE || "",
    ".malas-bikin-config.json",
  );

  if (!fs.existsSync(configPath)) {
    log(
      " Config filenya gk ada njirr. Gw bakal nyimpen confignya disini > ~/.malas-bikin-config.json",
      "red",
    );
    const apiKey = await ask(
      " Beri gw Gemini Api Key yang lu punya\n > apikey:",
    );
    const config: Config = {
      apiKey,
      generationConfig: {
        temperature: 0.3,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
    };
    await writeFile(configPath, JSON.stringify({ config }, null, 3));
    return config;
  } else {
    const configData = fs.readFileSync(configPath, "utf-8");
    const result: { config: Config } = JSON.parse(configData);
    return result.config;
  }
};
