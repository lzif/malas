import fs from "fs";
import path from "path";
import log from "./logger";
import readline from "readline-sync";
import { writeFile } from "./fileWriter";
interface Config {
  apiKey: string;
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
    const apiKey = readline.question(
      " Beri gw GroqAI ApiKey > apikey:",
      {
        hideEchoBack: true,
      },
    );
    await writeFile(configPath, JSON.stringify({ apiKey },null,3));
    return { apiKey };
  } else {
    const configData = fs.readFileSync(configPath, "utf-8");
    return JSON.parse(configData);
  }
};
