#!/usr/bin/env node

import { Command } from 'commander';
import { createProject } from './commands/create.js';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

// Read version from our own package.json
const pkg = require(join(__dirname, '../package.json')) as { version: string };

const program = new Command();

program
  .name('create-expresskit')
  .description('Scaffold a production-ready Express.js backend in seconds')
  .version(pkg.version, '-v, --version', 'Output the current version')
  .helpOption('-h, --help', 'Display help')
  .addHelpText(
    'after',
    `
Examples:
  $ npx create-expresskit
  $ npx create-expresskit --version
`
  );

program.action(async () => {
  await createProject();
});

program.parseAsync(process.argv).catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});