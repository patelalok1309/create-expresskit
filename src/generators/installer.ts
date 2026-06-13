import { execa } from 'execa';
import ora from 'ora';
import type { PackageManager } from '../types/index.js';

const INSTALL_COMMANDS: Record<PackageManager, string[]> = {
  npm: ['install'],
  pnpm: ['install'],
  yarn: [],          // `yarn` with no args installs
  bun: ['install'],
};

/**
 * Run the appropriate package manager install command inside `cwd`.
 * Shows an ora spinner while running. Throws on failure.
 */
export async function installDependencies(
  packageManager: PackageManager,
  cwd: string
): Promise<void> {
  const args = INSTALL_COMMANDS[packageManager];
  const spinner = ora(`Installing dependencies with ${packageManager}...`).start();

  try {
    await execa(packageManager, args, {
      cwd,
      stdio: 'pipe',
    });
    spinner.succeed(`Dependencies installed with ${packageManager}`);
  } catch (error) {
    spinner.fail('Dependency installation failed');
    throw error;
  }
}
