import { join } from 'path';
import { TEMPLATES_DIR, copyTemplate } from '../generators/template.js';
import type { Plugin } from './types.js';
import type { GeneratorContext } from '../types/index.js';

export class RedisPlugin implements Plugin {
  name = 'redis';

  shouldRun(ctx: GeneratorContext): boolean {
    return ctx.useRedis && ctx.redisClient !== null;
  }

  async apply(ctx: GeneratorContext): Promise<void> {
    // Select the sub-directory matching the chosen redis client
    const clientDir = ctx.redisClient ?? 'ioredis';
    const templateDir = join(TEMPLATES_DIR, 'redis', clientDir);
    await copyTemplate(templateDir, ctx.outputDir, ctx);
  }
}
