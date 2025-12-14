import { input } from '@inquirer/prompts';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import pc from 'picocolors';
import type { Generator } from '../../types/index.js';

export default {
  meta: {
    description: 'Generate new generator (for maintainers)'
  },

  async run(args) {
    const category = args[0] || await input({
      message: 'Category:',
      default: 'custom'
    });

    const type = args[1] || await input({
      message: 'Type:',
      validate: v => v.length > 0 || 'Type required'
    });

    const genPath = join(process.cwd(), 'src/gen', category);
    const genFile = join(genPath, `${type}.ts`);
    const templateDir = join(genPath, 'templates', type);

    // Generator file
    const generatorContent = `import { input } from '@inquirer/prompts';
import { renderTemplates, createContext } from '../../core/template.js';
import { join } from 'path';
import type { Generator } from '../../types/index.js';

export default {
  meta: {
    description: '\${category}/\${type} generator'
  },

  async run(args) {
    const name = args[0] || await input({
      message: 'Name:',
      validate: v => v.length > 0 || 'Name required'
    });

    const context = createContext(name);
    const templateDir = join(import.meta.dirname, 'templates/\${type}');
    const outputDir = join(process.cwd(), 'output/path');

    await renderTemplates(templateDir, outputDir, context);
  }
} satisfies Generator;
`;

    // Template file
    const templateContent = `{{!-- \${category}/\${type} template --}}
# Template for {{name}}

Generated content here.
`;

    // Create files
    await mkdir(dirname(genFile), { recursive: true });
    await writeFile(genFile, generatorContent);

    await mkdir(templateDir, { recursive: true });
    await writeFile(join(templateDir, 'template.mustache'), templateContent);

    console.log(pc.green('\n✓ Generator created!\n'));
    console.log('  ' + pc.cyan('Generator: ') + genFile);
    console.log('  ' + pc.cyan('Templates: ') + templateDir + '/\n');
    console.log(pc.dim('Edit files and test with: malas gen ' + category + ' ' + type + ' <name>\n'));
  }
} satisfies Generator;