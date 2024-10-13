#!/usr/bin/env node

import readline from "readline-sync";
import generate from "./ai";
import log from "./logger";
import { writeFile } from "./fileWriter";
import { getConfig } from "./ConfigManager";
import { ParseResult } from "./aiResultParser";

const main = async () => {
  log(" Halo orang malas!?");
  const config = await getConfig();
  const aiPrompt = readline.question(" Mau ngapain? ");
  log(" Bentar mikir dulu ...");
  let result: ParseResult[] = [];
  try {
    result = await generate(aiPrompt, config);
  } catch (err) {
    console.log(err);
    log(" Gw juga malas", "red");
  }
  if (result.length == 0) {
    log(" Aduh gw juga malas ...", "red");
    return;
  }
  let num = 1;
  for (const item of result) {
    log(`\n Step ${num}. ════════════`, "cyan");
    num++;
    if (item.filename) {
      if (item.code && item.filename) {
        log(` ┌─── Bikin file : ${item.filename} ───`, "green");
        log(
          " \x1b[32m│\x1b[0m " +
          item.code.replace(/\n/g, "\n \x1b[32m│\x1b[0m "),
        );
        log(" └─── end ───", "green");

        if (readline.keyInYN(" Lu yakin mau nyimpen file ini?")) {
          await writeFile(item.filename, item.code);
        }
      }
      //} else if (item.type === "command") {
      //  if (item.command) {
      //    log(" Run command:\n  $ " + item.command, "blue");
      //    if (item.description) log(" Deskripsi: " + item.description, "cyan");
      //
      //    if (readline.keyInYN(" Lu yakin mau run command ini? [Yakin/nope]>")) {
      //      await runCommand(item.command);
      //    }
      //  }
    }
    log("══════════════════", "cyan");
  }
};
main();
