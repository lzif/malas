#!/usr/bin/env node
import { Command } from "commander";
import { Config, getConfig } from "./config";
import { version } from "../package.json";
import bikin from "./commands/bikin";
import rapiin from "./commands/rapiin";
import jelasin from "./commands/jelasin";
import test from "./commands/test";
import bikinDocs from "./commands/bikin-docs";
import { validateFilePath } from "./services/file";
const program = new Command();

async function executeCommand(
  command: string,
  prompt: string,
  config: Config,
  filepath?: string | null,
) {
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
  try {
    program
      .name("malas")
      .description("AI CLI untuk berbagai utilitas coding.")
      .version(version);

    const config = await getConfig();

    program
      .command("bikin")
      .description("Membuat komponen atau kode baru sesuai deskripsi")
      .argument("<prompt>", "Deskripsi komponen atau kode yang akan dibuat")
      .action(async (prompt) => {
        await executeCommand("bikin", prompt, config);
      });

    program
      .command("rapiin")
      .description("Membersihkan dan merapikan kode yang ada")
      .argument("<prompt>", "Instruksi bagaimana code harus dirapikan")
      .argument("<filepath>", "Path ke file yang akan dirapikan")
      .action(async (prompt, filepath) => {
        const validatedPath = await validateFilePath(filepath);
        await executeCommand("rapiin", prompt, config, validatedPath);
      });

    program
      .command("jelasin")
      .description("Memberikan penjelasan singkat mengenai kode atau fungsi")
      .argument("<prompt>", "Bagian kode yang perlu dijelaskan")
      .argument("<filepath>", "Path ke file yang akan dijelaskan")
      .action(async (prompt, filepath) => {
        const validatedPath = await validateFilePath(filepath);
        await executeCommand("jelasin", prompt, config, validatedPath);
      });

    program
      .command("test")
      .description("Membuat unit test untuk kode atau fungsi tertentu")
      .argument("<prompt>", "Deskripsi test yang akan dibuat")
      .argument("<filepath>", "Path ke file yang akan ditest")
      .action(async (prompt, filepath) => {
        const validatedPath = await validateFilePath(filepath);
        await executeCommand("test", prompt, config, validatedPath);
      });

    program
      .command("bikin-docs")
      .description(
        "Membuat dokumentasi untuk fungsi atau modul yang disebutkan",
      )
      .argument("<prompt>", "Deskripsi dokumentasi yang akan dibuat")
      .argument("<filepath>", "Path ke file yang akan didokumentasikan")
      .action(async (prompt, filepath) => {
        const validatedPath = await validateFilePath(filepath);
        await executeCommand("bikin-docs", prompt, config, validatedPath);
      });

    program.showHelpAfterError(
      "Format command salah. Gunakan 'malas <command> <prompt> [filepath]' untuk menjalankan.",
    );

    program.parse(process.argv);

    if (!process.argv.slice(2).length) {
      program.outputHelp();
      process.exit(0);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error: " + err.message);
    } else {
      console.error("Unexpected Error.");
    }
  }
}

main();
