import { input } from '@inquirer/prompts';
import { renderTemplates, createContext } from '../../core/template.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { Generator } from '../../types/index.js';

export default {
  meta: {
    description: 'SvelteKit route with server load'
  },

  async run(args) {
    const name = args[0] || await input({
      message: 'Route name:',
      validate: v => v.length > 0 || 'Name required'
    });

    const __dirname = dirname(fileURLToPath(import.meta.url));
    const context = createContext(name);
    const templateDir = join(__dirname, 'templates/route');
    const outputDir = join(process.cwd(), 'src/routes', name);

    await renderTemplates(templateDir, outputDir, context);
  }
} satisfies Generator;

