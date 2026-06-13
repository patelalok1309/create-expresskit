import { fileURLToPath } from 'url';
import { dirname, join, relative, extname, basename } from 'path';
import ejs from 'ejs';
import fs from 'fs-extra';
import type { GeneratorContext } from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Root templates directory — two levels up from src/generators/
 * Works for both `tsx src/` (dev) and `node dist/` (production).
 */
export const TEMPLATES_DIR = join(__dirname, '../../templates');

/**
 * Render a single EJS file and return the result as a string.
 */
export async function renderTemplate(
  templatePath: string,
  ctx: GeneratorContext
): Promise<string> {
  const raw = await fs.readFile(templatePath, 'utf-8');
  return ejs.render(raw, ctx, { async: false });
}

/**
 * Determine the output filename for a given template filename.
 *
 * Rules:
 *  1. Strip the trailing `.ejs` extension.
 *  2. If language is JavaScript and the result ends in `.ts`, rename to `.js`.
 */
function resolveOutputFilename(templateFilename: string, ctx: GeneratorContext): string {
  // Strip .ejs
  let name = templateFilename.endsWith('.ejs')
    ? templateFilename.slice(0, -4)
    : templateFilename;

  // Remap .ts → .js for JavaScript projects
  if (ctx.language === 'JavaScript' && name.endsWith('.ts')) {
    name = name.slice(0, -3) + '.js';
  }

  return name;
}

/**
 * Recursively copy and render all `.ejs` files from `templateDir` into `outputDir`.
 * Non-`.ejs` files are copied as-is (useful for binary assets if ever needed).
 */
export async function copyTemplate(
  templateDir: string,
  outputDir: string,
  ctx: GeneratorContext
): Promise<void> {
  const entries = await fs.readdir(templateDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(templateDir, entry.name);

    if (entry.isDirectory()) {
      const destDir = join(outputDir, entry.name);
      await copyTemplate(srcPath, destDir, ctx);
      continue;
    }

    if (entry.name.endsWith('.ejs')) {
      const rendered = await renderTemplate(srcPath, ctx);
      const outName = resolveOutputFilename(entry.name, ctx);
      const outPath = join(outputDir, outName);
      await fs.ensureDir(dirname(outPath));
      await fs.writeFile(outPath, rendered, 'utf-8');
    } else {
      // Copy non-template files verbatim
      const outPath = join(outputDir, entry.name);
      await fs.ensureDir(dirname(outPath));
      await fs.copy(srcPath, outPath);
    }
  }
}
