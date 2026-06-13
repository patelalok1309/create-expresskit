import chalk from 'chalk';
import { confirm } from '@inquirer/prompts';
import { askQuestions } from '../prompts/questions.js';
import { generateProject } from '../generators/project.js';
import { installDependencies } from '../generators/installer.js';
import { initGit } from '../generators/git.js';
import type { ProjectAnswers } from '../types/index.js';

function printSummary(answers: ProjectAnswers): void {
  console.log('');
  console.log(chalk.bold('  Project summary'));
  console.log(chalk.dim('  ─────────────────────────────────'));
  console.log(`  ${chalk.cyan('Name')}            ${chalk.white(answers.projectName)}`);
  console.log(`  ${chalk.cyan('Language')}        ${chalk.white(answers.language)}`);
  console.log(`  ${chalk.cyan('Package Manager')} ${chalk.white(answers.packageManager)}`);
  console.log(`  ${chalk.cyan('Database')}        ${chalk.white(answers.database)}`);
  console.log(
    `  ${chalk.cyan('Redis')}           ${
      answers.useRedis
        ? chalk.white(`Yes (${answers.redisClient ?? ''})`)
        : chalk.dim('No')
    }`
  );
  console.log(
    `  ${chalk.cyan('Docker')}          ${
      answers.useDocker ? chalk.white('Yes') : chalk.dim('No')
    }`
  );
  console.log(
    `  ${chalk.cyan('Git')}             ${
      answers.initGit ? chalk.white('Yes') : chalk.dim('No')
    }`
  );
  console.log(
    `  ${chalk.cyan('Install Deps')}    ${
      answers.installDeps ? chalk.white('Yes') : chalk.dim('No')
    }`
  );
  console.log(chalk.dim('  ─────────────────────────────────'));
  console.log('');
}

function printNextSteps(projectName: string, answers: ProjectAnswers): void {
  const pm = answers.packageManager;
  const runCmd = pm === 'npm' ? 'npm run' : pm === 'yarn' ? 'yarn' : pm;

  console.log('');
  console.log(chalk.bold.green('  ✅ Project created successfully!\n'));
  console.log(chalk.bold('  Next steps:\n'));
  console.log(`  ${chalk.cyan('1.')} ${chalk.white(`cd ${projectName}`)}`);

  if (!answers.installDeps) {
    const installCmd =
      pm === 'npm'
        ? 'npm install'
        : pm === 'yarn'
        ? 'yarn'
        : `${pm} install`;
    console.log(`  ${chalk.cyan('2.')} ${chalk.white(installCmd)}`);
  }

  console.log(`  ${chalk.cyan(answers.installDeps ? '2.' : '3.')} ${chalk.white('cp .env.example .env')}`);
  console.log(
    `  ${chalk.cyan(answers.installDeps ? '3.' : '4.')} ${chalk.white(
      `${runCmd} dev`
    )}`
  );
  console.log('');
  console.log(
    `  ${chalk.dim('Server will start at')} ${chalk.cyan.underline('http://localhost:5000')}`
  );
  console.log(
    `  ${chalk.dim('Health check:')} ${chalk.cyan.underline('http://localhost:5000/health')}`
  );
  console.log('');
}

export async function createProject(): Promise<void> {
  console.log('');
  console.log(
    chalk.bold.cyan('  create-expresskit') +
      chalk.dim(' — Express.js backend scaffolder')
  );
  console.log('');

  // ── Collect answers ──────────────────────────────────────────────────────
  const answers = await askQuestions();

  // ── Show summary & confirm ───────────────────────────────────────────────
  printSummary(answers);

  const proceed = await confirm({
    message: 'Proceed with project creation?',
    default: true,
  });

  if (!proceed) {
    console.log(chalk.yellow('\n  Aborted.'));
    process.exit(0);
  }

  console.log('');

  try {
    // ── Generate ─────────────────────────────────────────────────────────
    const projectDir = await generateProject(answers);

    // ── Git init ─────────────────────────────────────────────────────────
    if (answers.initGit) {
      await initGit(projectDir);
    }

    // ── Install ───────────────────────────────────────────────────────────
    if (answers.installDeps) {
      await installDependencies(answers.packageManager, projectDir);
    }

    printNextSteps(answers.projectName, answers);
  } catch (error) {
    console.error('');
    console.error(chalk.red('  Error:'), error instanceof Error ? error.message : error);
    process.exit(1);
  }
}