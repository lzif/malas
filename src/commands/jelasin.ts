import chalk from "chalk";
import { Config } from "../config";
import generate from "../services/ai";
import { readFile } from "../services/file";
import log from "../services/logger";
import { parseText } from "../services/parser";
import { Message } from "../types";
import { buildMessage } from "../utils/buildMessage";

const INSTRUCTION =
  "Jelaskan fungsi atau modul berdasarkan prompt user. Gunakan format berikut:\n\n[DESKRIPSI]: <penjelasan detail fungsi atau modul>\n[CARA_PAKAI]: <contoh penggunaan fungsi/modul>";
const HISTORY: Message[] = [
  {
    role: "user",
    content:
      'instruction: jelasin semuanya\nkode:\n<script>\n\timport { onMount } from \'svelte\';\n</script>\n\n<div class="container mx-auto p-8">\n\t<h1 class="text-3xl font-bold mb-4">Login</h1>\n\t<form>\n\t\t<div class="mb-4">\n\t\t\t<label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>\n\t\t\t<input type="email" id="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />\n\t\t</div>\n\t\t<div class="mb-4">\n\t\t\t<label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>\n\t\t\t<input type="password" id="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />\n\t\t</div>\n\t\t<button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>\n\t</form>\n</div>\n\n<style>\n\t.container {\n\t\twidth: 300px;\n\t}\n</style>',
  },
  {
    role: "assistant",
    content:
      "[DESKRIPSI]:\nKode ini merupakan komponen Svelte untuk halaman login. Komponen tersebut menampilkan form login sederhana dengan input email dan password, serta tombol submit.  Komponen ini menggunakan Tailwind CSS untuk styling.  `onMount` tidak digunakan dalam kode ini, dan form tidak memiliki aksi yang didefinisikan. Form login akan mengirimkan data ke backend (tidak ditampilkan dalam kode ini) untuk validasi dan otentikasi. Styling menggunakan kelas Tailwind CSS untuk tampilan yang responsif dan menarik.\n\n[CARA_PAKAI]:\nUntuk menggunakan komponen ini, tambahkan kode di atas ke dalam file `src/components/LoginPage.svelte`.  Kemudian, panggil komponen ini di halaman lain menggunakan tag `<LoginPage />`.  Perhatikan bahwa form tidak memiliki aksi (action), sehingga perlu adanya backend untuk menangani pengiriman data dan verifikasi.  Backend akan memproses input email dan password untuk melakukan validasi dan otentikasi.  Keberhasilan atau kegagalan login akan ditangani oleh backend.  Pada bagian client-side,  tampilan error atau pesan sukses bisa ditampilkan berdasarkan respon dari backend.\n",
  },
];

export default async function jelasin(
  prompt: string,
  config: Config,
  filepath?: string | null,
) {
  try {
    if (filepath) {
      let kode = await readFile(filepath);
      let improvedPrompt = `${prompt ? "instruction: " + prompt : ""}. Harus Ada [DESKRIPSI] dan [CARA_PAKAI]
kode:
${kode}
`;
      const message = buildMessage(improvedPrompt, INSTRUCTION, []);
      const AIResult = await generate(message);
      const { deskripsi, cara_pakai } = parseText(AIResult.answer);
      if (!deskripsi || !cara_pakai) {
        throw new Error("AI gagal memproses prompt");
      }
      log(chalk.blue("Deskripsi: ") + deskripsi);
      log(chalk.blue("Cara Pakai:\n") + cara_pakai);
    } else {
      throw new Error("File tidak ada");
    }
  } catch (err) {
    if (err instanceof Error) {
      log(err.message, "red");
    }
  }
}
