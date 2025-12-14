import Mustache from 'mustache';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import pc from 'picocolors';
import { confirm } from '@inquirer/prompts';
import fg from 'fast-glob';

export interface TemplateContext {
  name: string;
  Name: string;
  NAME: string;
  name_snake: string;
  name_kebab: string;
  [key: string]: any;
}

export function createContext(name: string, extras: Record<string, any> = {}): TemplateContext {
  return {
    name,
    Name: name.charAt(0).toUpperCase() + name.slice(1),
    NAME: name.toUpperCase(),
    name_snake: name.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, ''),
    name_kebab: name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, ''),
    ...extras
  };
}

export async function renderTemplates(
  templateDir: string,
  outputDir: string,
  context: TemplateContext
) {
  const templates = await fg('**/*.mustache', {
    cwd: templateDir,
    dot: true
  });

  const changes: Array<{ path: string; content: string; exists: boolean }> = [];

  // Collect changes
  for (const templateFile of templates) {
    const templatePath = join(templateDir, templateFile);
    const templateContent = await readFile(templatePath, 'utf-8');
    const content = Mustache.render(templateContent, context);

    // Compile output path
    const relativePath = templateFile.replace('.mustache', '');
    const compiledPath = Mustache.render(relativePath, context);
    const finalPath = join(outputDir, compiledPath);

    changes.push({
      path: finalPath,
      content,
      exists: existsSync(finalPath)
    });
  }

  // Preview
  if (changes.length === 0) {
    console.log(pc.yellow('No files to generate'));
    return;
  }

  console.log(pc.bold('\nPreview:\n'));
  changes.forEach(change => {
    const symbol = change.exists ? pc.yellow('~') : pc.green('+');
    console.log(`  ${symbol} ${change.path}`);
  });
  console.log();

  // Confirm
  const confirmed = await confirm({
    message: 'Apply changes?',
    default: true
  });

  if (!confirmed) {
    console.log(pc.dim('Cancelled'));
    return;
  }

  // Apply
  for (const change of changes) {
    await mkdir(dirname(change.path), { recursive: true });
    await writeFile(change.path, change.content);
  }

  console.log(pc.green('\n✓ Done!\n'));
}