import { input, select, confirm } from '@inquirer/prompts';
import validate from 'validate-npm-package-name';
import type { ProjectAnswers, Language, PackageManager, Database, RedisClient } from '../types/index.js';

export async function askQuestions(): Promise<ProjectAnswers> {
  // ── Q1: Project Name ────────────────────────────────────────────────────
  const projectName = await input({
    message: 'Project name:',
    default: 'my-backend-app',
    validate(value: string) {
      if (!value.trim()) return 'Project name is required';
      const result = validate(value.trim());
      if (!result.validForNewPackages) {
        return result.errors?.[0] ?? result.warnings?.[0] ?? 'Invalid npm package name';
      }
      return true;
    },
  });

  // ── Q2: Language ─────────────────────────────────────────────────────────
  const language = await select<Language>({
    message: 'Language:',
    choices: [
      { name: 'TypeScript (recommended)', value: 'TypeScript' },
      { name: 'JavaScript', value: 'JavaScript' },
    ],
    default: 'TypeScript',
  });

  // ── Q3: Package Manager ──────────────────────────────────────────────────
  const packageManager = await select<PackageManager>({
    message: 'Package manager:',
    choices: [
      { name: 'npm', value: 'npm' },
      { name: 'pnpm', value: 'pnpm' },
      { name: 'yarn', value: 'yarn' },
      { name: 'bun', value: 'bun' },
    ],
    default: 'npm',
  });

  // ── Q4: Database ─────────────────────────────────────────────────────────
  const database = await select<Database>({
    message: 'Database:',
    choices: [
      { name: 'MongoDB (Mongoose)', value: 'MongoDB (Mongoose)' },
      { name: 'None', value: 'None' },
    ],
    default: 'MongoDB (Mongoose)',
  });

  // ── Q5: Redis ────────────────────────────────────────────────────────────
  const useRedis = await confirm({
    message: 'Add Redis support?',
    default: false,
  });

  // ── Q6: Redis Client (conditional) ──────────────────────────────────────
  let redisClient: RedisClient | null = null;
  if (useRedis) {
    redisClient = await select<RedisClient>({
      message: 'Redis client:',
      choices: [
        {
          name: 'ioredis  ← recommended for production systems',
          value: 'ioredis',
        },
        { name: 'redis (official node-redis)', value: 'redis' },
      ],
      default: 'ioredis',
    });
  }

  // ── Q7: Docker ───────────────────────────────────────────────────────────
  const useDocker = await confirm({
    message: 'Add Docker support?',
    default: false,
  });

  // ── Q8: Git ──────────────────────────────────────────────────────────────
  const initGit = await confirm({
    message: 'Initialize a git repository?',
    default: true,
  });

  // ── Q9: Install Dependencies ─────────────────────────────────────────────
  const installDeps = await confirm({
    message: `Install dependencies now? (via ${packageManager})`,
    default: true,
  });

  return {
    projectName: projectName.trim(),
    language,
    packageManager,
    database,
    useRedis,
    redisClient,
    useDocker,
    initGit,
    installDeps,
  };
}