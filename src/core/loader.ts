import fg from 'fast-glob';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { existsSync } from 'fs';
import type { Generator } from '../types/index.js';

export async function loadGenerators() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // In production: dist/core/loader.js → gen is at dist/gen
  // In dev: src/core/loader.ts → gen is at src/gen
  const genDir = path.join(__dirname, '../gen');
  
  // Check if we're running compiled code
  const isCompiled = __filename.endsWith('.js');
  const pattern = isCompiled ? '**/*.js' : '**/*.ts';

  console.log('[DEBUG] Loader info:', {
    __dirname,
    genDir,
    exists: existsSync(genDir),
    pattern
  });

  if (!existsSync(genDir)) {
    console.error(`[ERROR] Gen directory not found: ${genDir}`);
    return new Map();
  }

  const entries = await fg(pattern, {
    cwd: genDir,
    absolute: false,
    ignore: ['**/*.d.ts', '**/templates/**']
  });

  console.log('[DEBUG] Found files:', entries);

  const commands = new Map<string[], Generator>();

  for (const file of entries) {
    const parts = file.replace(/\.(j|t)s$/, '').split(path.sep);

    try {
      const fullPath = path.join(genDir, file);
      const mod = await import(pathToFileURL(fullPath).href) as { default: Generator };

      commands.set(parts, mod.default);
      console.log('[DEBUG] Loaded:', parts.join('/'));
    } catch (err) {
      console.error(`[ERROR] Failed to load generator: ${file}`, err);
    }
  }

  return commands;
}
