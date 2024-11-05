import { Part } from "@google/generative-ai"
import { Config } from "../config"
import { writeFile } from "../services/file";
import generate from "../services/ai"
import log from "../services/logger";

const INSTRUCTION: Part = {
  text: `Buat komponen atau kode sesuai deskripsi dari user. Output harus terstruktur dan menggunakan format di bawah ini:

Format Output:

     [FILEPATH]
     <path file tempat komponen atau kode ini disimpan, contoh: ./src/components/Login.svelte>

     [KOMPONEN]
     <kode komponen atau fungsi di sini, usahakan simple dan pakai prinsip DRY,KISS>

     [KETERANGAN]
     <penjelasan singkat dan ringkas tentang komponen dan bagaimana cara menggunakannya>

Pastikan format ini diikuti secara konsisten dan tanpa penjelasan tambahan, hanya penjelasan inti dibawah [KETERANGAN]`,
}

const HISTORY = [{
  role: "user",
  parts: [
    { text: "fungsi untuk cek ganjil atau genap dengan typescript" },
  ],
},
{
  role: "model",
  parts: [
    {
      text: '[FILEPATH]\n./src/utils/isEvenOdd.ts\n\n[KOMPONEN]\nfunction isEvenOdd(num: number): string {\n  if (num % 2 === 0) {\n    return "Genap";\n  } else {\n    return "Ganjil";\n  }\n}\n\nexport default isEvenOdd;\n\n[KETERANGAN]\nFungsi `isEvenOdd` menerima satu argumen berupa angka (`num`). Fungsi ini akan mengembalikan string "Genap" jika angka tersebut genap, dan "Ganjil" jika angka tersebut ganjil.',
    },
  ],
}]

const parseContent = (input: string) => {
  const filePathMatch = input.match(/\[FILEPATH\]\n(.+?)\n\n/);
  const componentMatch = input.match(
    /\[KOMPONEN\]\n([\s\S]*?)\n\n\[KETERANGAN\]/,
  );
  const descriptionMatch = input.match(/\[KETERANGAN\]\n([\s\S]*)/);

  const filePath = filePathMatch ? filePathMatch[1].trim() : null;
  const component = componentMatch
    ? componentMatch[1]
      .trim()
      .replace(/\`\`\`(.+?)\n/, "")
      .replace("```", "")
    : null;
  const description = descriptionMatch ? descriptionMatch[1].trim() : null;

  return { filePath, component, description };
};

export default async function bikin(prompt: string, config: Config) {
  const AIResult = await generate(INSTRUCTION, prompt, config, HISTORY)
  console.log(AIResult)
  const { filePath, component, description } = parseContent(AIResult)
  if (filePath && component) {
    log(" Deskripsi: " + description)
    await writeFile(filePath, component)
    log(` File ${filePath} sudah berhasil disimpan`)
  }
}
