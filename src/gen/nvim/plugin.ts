import { input } from '@inquirer/prompts';
import { renderTemplates, createContext } from '../../core/template.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';
import type { Generator } from '../../types/index.js';

export default {
  meta: {
    description: 'Neovim plugin configuration'
  },

  async run(args) {
    const name = args[0] || await input({
      message: 'Plugin name:',
      validate: v => v.length > 0 || 'Name required'
    });

    const configPath = await input({
      message: 'Neovim config path:',
      default: join(homedir(), '.config/nvim')
    });

    const __dirname = dirname(fileURLToPath(import.meta.url));
    const context = createContext(name);
    const templateDir = join(__dirname, 'templates/plugin');
    const outputDir = join(configPath, 'lua/plugins');

    await renderTemplates(templateDir, outputDir, context);
  }
} satisfies Generator;
