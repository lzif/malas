import { Config } from "../config";
import { writeFile } from "../services/file";
import generate from "../services/ai";
import log, { logCode } from "../services/logger";
import { yOrN } from "../utils/readlineHelper";
import { parseText } from "../services/parser";
import chalk from "chalk";
import { Message } from "../types";

const INSTRUCTION = `Buat kode,komponen atau fungsi sesuai prompt dari user. Gunakan format berikut:

[FILEPATH]: <path file, misal src/components/Login.svelte>
[KODE]:
<kode komponen atau fungsi di sini>

[KETERANGAN]: <deskripsi singkat dan ringkas tentang komponen/fungsi, kalau bisa 1 paragraf>`;

const HISTORY: Message[] = [
  {
    role: "user",
    content: "Login page svelte&tailwind tanpa logic",
  },
  {
    role: "assistant",
    content:
      '[FILEPATH]: src/components/LoginPage.svelte\n[KODE]: \n<script>\n\timport { onMount } from \'svelte\';\n</script>\n\n<div class="container mx-auto p-8">\n\t<h1 class="text-3xl font-bold mb-4">Login</h1>\n\t<form>\n\t\t<div class="mb-4">\n\t\t\t<label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>\n\t\t\t<input type="email" id="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />\n\t\t</div>\n\t\t<div class="mb-4">\n\t\t\t<label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>\n\t\t\t<input type="password" id="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />\n\t\t</div>\n\t\t<button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>\n\t</form>\n</div>\n\n<style>\n\t.container {\n\t\twidth: 300px;\n\t}\n</style>\n\n[KETERANGAN]:  Komponen halaman login sederhana dengan Svelte dan Tailwind CSS.  Menggunakan form untuk menerima input email dan password.  Tidak termasuk logika validasi atau pemrosesan server-side.  Hanya tampilan.  Menggunakan Tailwind CSS untuk styling.  Menggunakan Svelte untuk membuat komponen.  Belum ada penanganan submit form.  Hanya tampilan form.  Contoh styling yang mudah.\n',
  },
];

export default async function bikin(prompt: string, config: Config) {
  try {
    const message: Message[] = [
      {
        role: "system",
        content: INSTRUCTION,
      },
      ...HISTORY,
      {
        role: "user",
        content: prompt + "\nharus ada [FILEPATH] [KODE] [KETERANGAN]",
      },
    ];
    const AIResult = await generate(message);
    const { filepath, kode, keterangan } = parseText(AIResult.answer);

    if (filepath && kode) {
      logCode(kode, filepath);

      if (keterangan) {
        log(chalk.yellow.bold("Deskripsi: ") + keterangan);
      }

      let save = await yOrN(chalk.magenta.bold(" Simpan file?"));
      if (save) {
        await writeFile(
          filepath,
          kode.replace(/```(.*?)\n/g, "").replace(/```/g, ""),
        ); //patch
      }
      process.exit(1);
    } else {
      await bikin(prompt, config);
    }
  } catch (error) {
    if (error instanceof Error) {
      log("Terjadi kesalahan: " + error.message, "red");
    }
  }
}
