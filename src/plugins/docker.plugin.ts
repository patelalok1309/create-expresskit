import { join } from 'path';
import { TEMPLATES_DIR, copyTemplate } from '../generators/template.js';
import type { Plugin } from './types.js';
import type { GeneratorContext } from '../types/index.js';

export class DockerPlugin implements Plugin {
  name = 'docker';

  shouldRun(ctx: GeneratorContext): boolean {
    return ctx.useDocker;
  }

  async apply(ctx: GeneratorContext): Promise<void> {
    const templateDir = join(TEMPLATES_DIR, 'docker');
    await copyTemplate(templateDir, ctx.outputDir, ctx);
  }
}
