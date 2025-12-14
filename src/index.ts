#!/usr/bin/env node
import { Command } from 'commander';
import { loadGenerators } from './core/loader.js';
import { configCommand } from './commands/config.js';

const program = new Command();

program
  .name('malas')
  .description('Deterministic CLI generator for repetitive dev workflows')
  .version('2.0.0');

// Load and register generators dynamically
const generators = await loadGenerators();

// Build command tree properly
const genCommand = program.command('gen').description('Generate from templates');

// Group by category
const grouped = new Map<string, Array<{ parts: string[], gen: any }>>();
for (const [parts, gen] of generators) {
  const category = parts[0];
  if (!grouped.has(category)) {
    grouped.set(category, []);
  }
  grouped.get(category)!.push({ parts, gen });
}

// Register commands: malas gen <category> <type> [args...]
for (const [category, items] of grouped) {
  for (const { parts, gen } of items) {
    // parts = ['svelte', 'route'] → command: gen svelte route
    const commandPath = parts.join(' ');
    
    genCommand
      .command(commandPath)
      .description(gen.meta?.description ?? '')
      .allowExcessArguments(true)
      .allowUnknownOption(true)
      .action(async (...commandArgs) => {
        // Last arg is the Command object, rest are args
        const args = commandArgs.slice(0, -1);
        await gen.run(args);
      });
  }
}

// Static commands
program.addCommand(configCommand);

program
  .command('list')
  .description('List all available generators')
  .action(() => {
    const categoryMap = new Map<string, string[]>();

    for (const [parts] of generators) {
      const category = parts[0];
      const type = parts.slice(1).join('/');
      
      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }
      categoryMap.get(category)!.push(type);
    }

    console.log('\n📦 Available Generators\n');
    for (const [category, types] of categoryMap) {
      console.log(`${category}:`);
      types.forEach(type => console.log(`  ● ${type}`));
      console.log();
    }
  });

program.parse();

