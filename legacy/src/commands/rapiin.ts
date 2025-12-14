import chalk from "chalk";
import { Config } from "../config";
import generate from "../services/ai";
import { readFile, writeFile } from "../services/file";
import log, { logCode } from "../services/logger";
import { buildMessage } from "../utils/buildMessage";
import { yOrN } from "../utils/readlineHelper";
import { parseText } from "../services/parser";

const INSTRUCTION = `Refactor kode berikut agar lebih clean dan sesuai best practices. Gunakan format berikut:

[FILEPATH]: <path file tempat kode, misal src/utils/auth.js>
[KODE]:
<kode yang sudah di-refactor>
[KETERANGAN]: <penjelasan perubahan refactor>`

export default async function rapiin(
  prompt: string,
  config: Config,
  filepath: string,
) {
  const isiFile = await readFile(filepath)
  const improvedPrompt = `${prompt ? prompt+", dan kodenya jangan dipisah ke beberapa file" : "Refactor kode ini agar lebih clean dan terstruktur dan mudah di maintain tapi kodenya jangan dipisah jadi beberapa file"}, Harus ada [FILEPATH] [KODE] [KETERANGAN] jangan ubah filepath

[FILEPATH] ${filepath}
[KODE_AWAL]
${isiFile}`
  const messages = buildMessage(improvedPrompt, INSTRUCTION, [])
  const AIResult = await generate(messages)
  try {
    const { filepath, kode, keterangan } = parseText(AIResult.answer)
    if (!kode && !keterangan) {
      log("Gagal refactor, coba lagi.")
      await rapiin(prompt, config, filepath)
    } else {
      logCode(isiFile!, filepath,kode)
      log(chalk.yellow.bold("Keterangan: ") + keterangan)
      if (await yOrN(chalk.magenta.bold(" Simpan file?"))) {
        await writeFile(filepath, kode)
      }
    }
  } catch (err) {
    if (err instanceof Error) { 
      log("Terjadi kesalahan: " + err.message, "red"); 
    }
  }
}
