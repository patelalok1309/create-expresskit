export type Language = 'TypeScript' | 'JavaScript';
export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';
export type Database = 'MongoDB (Mongoose)' | 'None';
export type RedisClient = 'ioredis' | 'redis';

export interface ProjectAnswers {
  projectName: string;
  language: Language;
  packageManager: PackageManager;
  database: Database;
  useRedis: boolean;
  redisClient: RedisClient | null;
  useDocker: boolean;
  initGit: boolean;
  installDeps: boolean;
}

export interface GeneratorContext {
  projectName: string;
  language: Language;
  packageManager: PackageManager;
  useTypeScript: boolean;
  useMongoDb: boolean;
  useRedis: boolean;
  redisClient: RedisClient | null;
  useDocker: boolean;
  initGit: boolean;
  installDeps: boolean;
  outputDir: string;
  year: number;
}
