import { join, resolve } from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import { getActivePlugins } from '../plugins/registry.js';
import type { GeneratorContext, ProjectAnswers } from '../types/index.js';

/**
 * Build a GeneratorContext from raw user answers.
 */
function buildContext(answers: ProjectAnswers, targetDir: string): GeneratorContext {
  return {
    projectName: answers.projectName,
    language: answers.language,
    packageManager: answers.packageManager,
    useTypeScript: answers.language === 'TypeScript',
    useMongoDb: answers.database === 'MongoDB (Mongoose)',
    useRedis: answers.useRedis,
    redisClient: answers.redisClient,
    useDocker: answers.useDocker,
    initGit: answers.initGit,
    installDeps: answers.installDeps,
    outputDir: targetDir,
    year: new Date().getFullYear(),
  };
}

/**
 * Generate a full project from user answers.
 */
export async function generateProject(answers: ProjectAnswers): Promise<string> {
  const targetDir = resolve(process.cwd(), answers.projectName);

  // Refuse to overwrite a non-empty directory
  if (await fs.pathExists(targetDir)) {
    const contents = await fs.readdir(targetDir);
    if (contents.length > 0) {
      throw new Error(
        `Directory "${answers.projectName}" already exists and is not empty.`
      );
    }
  }

  await fs.ensureDir(targetDir);

  const ctx = buildContext(answers, targetDir);
  const plugins = getActivePlugins(ctx);

  const spinner = ora('Generating project files...').start();

  try {
    for (const plugin of plugins) {
      spinner.text = `Running plugin: ${plugin.name}...`;
      await plugin.apply(ctx);
    }
    spinner.succeed('Project files generated');
  } catch (error) {
    spinner.fail('Generation failed');
    // Clean up partially-created directory
    await fs.remove(targetDir).catch(() => undefined);
    throw error;
  }

  return targetDir;
}
