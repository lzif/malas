import fs from 'node:fs/promises';
import path from 'node:path';
import pc from 'picocolors';

const [, , domain, name] = process.argv;

if (!domain || !name) {
  console.error(pc.red('Usage: pnpm new:gen <domain> <name>'));
  console.error(pc.dim('Example: pnpm new:gen hono route'));
  process.exit(1);
}

const baseDir = path.join('src/gen', domain);
const filePath = path.join(baseDir, `${name}.ts`);
const templateDir = path.join(baseDir, 'templates', name);

try {
  await fs.access(filePath);
  console.error(pc.red(`Error: Generator already exists at ${filePath}`));
  process.exit(1);
} catch {
  // File doesn't exist, continue
}

await fs.mkdir(baseDir, { recursive: true });
await fs.mkdir(templateDir, { recursive: true });

const generatorTemplate = `import { input } from '@inquirer/prompts';
import { renderTemplates, createContext } from '../../core/template.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { Generator } from '../../types/index.js';

export default {
  meta: {
    description: 'Generate ${domain} ${name}',
  },
  async run(args) {
    const value = args[0] || await input({
      message: 'Name:',
      validate: v => v.length > 0 || 'Name required'
    });

    const __dirname = dirname(fileURLToPath(import.meta.url));
    const context = createContext(value);
    const templateDir = join(__dirname, 'templates/${name}');
    const outputDir = join(process.cwd(), 'output/path'); // TODO: Change this

    await renderTemplates(templateDir, outputDir, context);
  },
} satisfies Generator;
`;

const templateFile = path.join(templateDir, 'template.mustache');
const templateContent = `{{!-- ${domain}/${name} template --}}
# Template for {{name}}

TODO: Add your template content here.

Available variables:
- {{name}} - lowercase name
- {{Name}} - capitalized name
- {{NAME}} - uppercase name
- {{name_snake}} - snake_case
- {{name-kebab}} - kebab-case
`;

await fs.writeFile(filePath, generatorTemplate, 'utf8');
await fs.writeFile(templateFile, templateContent, 'utf8');

console.log(pc.green('\n✔ Generator created!\n'));
console.log(`  ${pc.cyan('Generator:')} ${filePath}`);
console.log(`  ${pc.cyan('Templates:')} ${templateDir}/\n`);
console.log(pc.dim('Next steps:'));
console.log(pc.dim('  1. Edit generator logic in ' + filePath));
console.log(pc.dim('  2. Add templates in ' + templateDir + '/'));
console.log(pc.dim('  3. Test with: malas gen ' + domain + ' ' + name + ' <value>\n'));
