import { execa } from 'execa';
import fs from 'fs-extra';
import { join } from 'path';

const GITIGNORE_CONTENT = `# Dependencies
node_modules/

# Build output
dist/

# Environment variables
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Testing
coverage/
.nyc_output/
`;

/**
 * Initialize a git repository in `cwd` and write a .gitignore.
 * Silently skips if git is not installed.
 */
export async function initGit(cwd: string): Promise<void> {
  try {
    await execa('git', ['init'], { cwd, stdio: 'pipe' });
    await execa('git', ['add', '--all'], { cwd, stdio: 'pipe' });
    await fs.writeFile(join(cwd, '.gitignore'), GITIGNORE_CONTENT, 'utf-8');
  } catch {
    // git not available — non-fatal
  }
}
