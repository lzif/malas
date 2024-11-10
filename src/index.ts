#!/usr/bin/env node
import { Command } from "commander";
import { Config, getConfig } from "./config";
import { version } from "../package.json";
import bikin from "./commands/bikin";
import rapiin from "./commands/rapiin";
import jelasin from "./commands/jelasin";
import test from "./commands/test";
import { commands } from "./commands";
import bikinDocs from "./commands/bikin-docs";
import bikinProject from "./commands/bikin-project";
import type { CommandArg, Command as Commands } from "./types";
import { validateArgs } from "./utils/validateArgs";
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
      await rapiin(prompt, config, filepath!);
      break;
    case "jelasin":
      await jelasin(prompt, config, filepath);
      break;
    case "test":
      await test(prompt, config, filepath);
      break;
    case "bikin-project":
      await bikinProject(prompt, config, filepath);
    case "bikin-docs":
      await bikinDocs(prompt, config, filepath);
      break;
    default:
      console.error(`Command tidak valid: ${command}`);
      process.exit(1);
  }
}

async function main() {
  process.on("uncaughtException", (err) => {
    console.error(`Error => ${err.message}`);
    process.exit(1);
  });

  try {
    const config = await getConfig();

    program
      .name("malas")
      .description("AI CLI untuk berbagai utilitas coding.")
      .version(version);

    // BREAKING CHANGE
    // Register semua command
    commands.forEach((cmd: Commands) => {
      let command = program
        .command(cmd.name)
        .description(`${cmd.emoji} ${cmd.description}`);

      // Tambah arguments sesuai definisi
      cmd.args.forEach((arg: CommandArg) => {
        const argString = arg.optional ? `[${arg.name}]` : `<${arg.name}>`;
        command = command.argument(argString, arg.description);
      });

      // Handle action untuk tiap command
      command.action(async (...args: any[]) => {
        // Hapus argument terakhir (object Commander)
        args.pop();
        args.pop();

        const validatedArgs = await validateArgs(cmd.args, args);
        const prompt = validatedArgs.prompt;
        const filepath = validatedArgs.filepath;
        await executeCommand(cmd.name, prompt!, config, filepath);
      });
    });
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
