import { defineConfig } from 'tsup';
import { copyFile, mkdir, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { existsSync } from 'fs';

async function copyTemplates() {
  const srcGen = 'src/gen';
  const distGen = 'dist/gen';

  async function copyDir(src: string, dest: string) {
    if (!existsSync(src)) return;
    
    await mkdir(dest, { recursive: true });
    const entries = await readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = join(src, entry.name);
      const destPath = join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else if (entry.name.endsWith('.mustache')) {
        await mkdir(dirname(destPath), { recursive: true });
        await copyFile(srcPath, destPath);
      }
    }
  }

  await copyDir(srcGen, distGen);
  console.log('✓ Templates copied');
}

export default defineConfig({
  entry: ['src/index.ts', 'src/gen/**/*.ts'],
  format: ['esm'],
  clean: true,
  splitting: false,
  dts: false,
  outDir: 'dist',
  outExtension: () => ({ js: '.js' }),
  async onSuccess() {
    await copyTemplates();
  },
});

