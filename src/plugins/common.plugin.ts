import { join } from 'path';
import { TEMPLATES_DIR, copyTemplate } from '../generators/template.js';
import type { Plugin } from './types.js';
import type { GeneratorContext } from '../types/index.js';

export class CommonPlugin implements Plugin {
  name = 'common';

  shouldRun(_ctx: GeneratorContext): boolean {
    return true; // Always runs
  }

  async apply(ctx: GeneratorContext): Promise<void> {
    const templateDir = join(TEMPLATES_DIR, 'common');
    await copyTemplate(templateDir, ctx.outputDir, ctx);
  }
}
