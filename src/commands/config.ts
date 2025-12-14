import { Command } from 'commander';
import { homedir } from 'os';
import { join } from 'path';
import { existsSync } from 'fs';
import pc from 'picocolors';

export const configCommand = new Command('config')
  .description('Show configuration paths')
  .action(() => {
    const configPath = join(homedir(), '.config', 'malas');

    console.log(pc.bold('\n⚙️  Configuration\n'));
    console.log(`${pc.cyan('Config dir:')}  ${configPath} ${existsSync(configPath) ? pc.green('✓') : pc.red('✗')}`);
    console.log(`${pc.cyan('Generators:')} src/gen/ (TypeScript)\n`);
  });