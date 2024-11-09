// main.ts
import { Command } from "commander";
import { getConfig } from "./config";
import { version } from "../package.json";
import bikin from "./commands/bikin";
import rapiin from "./commands/rapiin";
import jelasin from "./commands/jelasin";
import test from "./commands/test";
import bikinDocs from "./commands/bikin-docs";
const program = new Command();

// Define valid commands and descriptions
const validCommands = [
  {
    name: "bikin",
    description: "Membuat komponen atau kode baru sesuai deskripsi",
  },
  { name: "rapiin", description: "Membersihkan dan merapikan kode yang ada" },
  {
    name: "jelasin",
    description: "Memberikan penjelasan singkat mengenai kode atau fungsi",
  },
  {
    name: "test",
    description: "Membuat unit test untuk kode atau fungsi tertentu",
  },
  {
    name: "bikin-docs",
    description: "Membuat dokumentasi untuk fungsi atau modul yang disebutkan",
  },
];

async function executeCommand(command: string, prompt: string, config: any, filepath?: string | null) {
  switch (command) {
    case "bikin":
      await bikin(prompt, config);
      break;
    case "rapiin":
      await rapiin(prompt, config, filepath);
      break;
    case "jelasin":
      await jelasin(prompt, config, filepath);
      break;
    case "test":
      await test(prompt, config, filepath);
      break;
    case "bikin-docs":
      await bikinDocs(prompt, config, filepath);
      break;
    default:
      console.error(`Command tidak valid: ${command}`);
      process.exit(1);
  }
}

async function main() {
  program
    .name("malas")
    .description("AI CLI untuk berbagai utilitas coding.")
    .version(version); 

  const config = await getConfig();

  program
  .command('bikin')
  .description('Membuat komponen atau kode baru sesuai deskripsi')
  .argument('<prompt>', 'Deskripsi komponen atau kode yang akan dibuat')
  .action(async (prompt) => {
    await executeCommand('bikin', prompt, config);
  });
  //validCommands.forEach(({ name, description }) => {
  //  program
  //    .command(name)
  //    .description(description)
  //    .argument("<prompt>", "Deskripsi atau prompt yang diperlukan")
  //    .argument("[filepath]", "File yang dibutuhkan untuk beberapa command")
  //    .action(async (filepath, prompt) => {
  //      console.log(JSON.stringify({filepath,prompt},null,2))
  //      await executeCommand(name, prompt, config, filepath);
  //    });
  //});

  program.showHelpAfterError(
    "Format command salah. Gunakan 'malas <command> [filepath] <prompt>' untuk menjalankan."
  );

  program.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(0);
  }
}

main();
