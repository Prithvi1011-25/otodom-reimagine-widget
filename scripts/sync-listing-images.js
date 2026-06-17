import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const sourceRoot = join(root, 'src/assets/listings');
const publicRoot = join(root, 'public/listings');

if (!existsSync(sourceRoot)) {
  process.exit(0);
}

for (const slug of readdirSync(sourceRoot)) {
  const sourceDir = join(sourceRoot, slug);
  const targetDir = join(publicRoot, slug);
  mkdirSync(targetDir, { recursive: true });

  for (const file of readdirSync(sourceDir)) {
    if (!file.endsWith('.webp')) continue;
    cpSync(join(sourceDir, file), join(targetDir, file), { force: true });
  }
}

console.log('[sync-listing-images] public/listings updated');
