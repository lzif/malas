import { input } from '@inquirer/prompts';
import { renderTemplates, createContext } from '../../core/template.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';
import type { Generator } from '../../types/index.js';

export default {
  meta: {
    description: 'Fish shell config starter'
  },

  async run() {
    const configPath = await input({
      message: 'Fish config path:',
      default: join(homedir(), '.config/fish')
    });

    const __dirname = dirname(fileURLToPath(import.meta.url));
    const context = createContext('config');
    const templateDir = join(__dirname, 'templates/dotfile');
    const outputDir = configPath;

    await renderTemplates(templateDir, outputDir, context);
  }
} satisfies Generator;
