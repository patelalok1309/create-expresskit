import { join } from 'path';
import { TEMPLATES_DIR, copyTemplate } from '../generators/template.js';
import type { Plugin } from './types.js';
import type { GeneratorContext } from '../types/index.js';

export class MongoDbPlugin implements Plugin {
  name = 'mongodb';

  shouldRun(ctx: GeneratorContext): boolean {
    return ctx.useMongoDb;
  }

  async apply(ctx: GeneratorContext): Promise<void> {
    const templateDir = join(TEMPLATES_DIR, 'mongodb');
    await copyTemplate(templateDir, ctx.outputDir, ctx);
  }
}
