import { input, confirm } from '@inquirer/prompts';
import { renderTemplates, createContext } from '../../core/template.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { Generator } from '../../types/index.js';

export default {
  meta: {
    description: 'Svelte component with TypeScript'
  },

  async run(args) {
    const name = args[0] || await input({
      message: 'Component name:',
      validate: v => v.length > 0 || 'Name required'
    });

    const props = await confirm({
      message: 'Add props?',
      default: false
    });

    const __dirname = dirname(fileURLToPath(import.meta.url));
    const context = createContext(name, { props });
    const templateDir = join(__dirname, 'templates/component');
    const outputDir = join(process.cwd(), 'src/lib/components');

    await renderTemplates(templateDir, outputDir, context);
  }
} satisfies Generator;

