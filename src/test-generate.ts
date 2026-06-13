/**
 * Smoke test — generates a project with all features enabled, non-interactively.
 * Run with: npx tsx src/test-generate.ts
 */
import { generateProject } from './generators/project.js';
import type { ProjectAnswers } from './types/index.js';

const answers: ProjectAnswers = {
  projectName: 'smoke-test-project',
  language: 'TypeScript',
  packageManager: 'npm',
  database: 'MongoDB (Mongoose)',
  useRedis: true,
  redisClient: 'ioredis',
  useDocker: true,
  initGit: false,
  installDeps: false,
};

try {
  const dir = await generateProject(answers);
  console.log('✅ Generated to:', dir);
} catch (err) {
  console.error('❌ Failed:', err);
  process.exit(1);
}
