import { join } from 'path';
import { TEMPLATES_DIR, copyTemplate } from '../generators/template.js';
import type { Plugin } from './types.js';
import type { GeneratorContext } from '../types/index.js';

export class TypeScriptPlugin implements Plugin {
  name = 'typescript';

  shouldRun(ctx: GeneratorContext): boolean {
    return ctx.useTypeScript;
  }

  async apply(ctx: GeneratorContext): Promise<void> {
    const templateDir = join(TEMPLATES_DIR, 'typescript');
    await copyTemplate(templateDir, ctx.outputDir, ctx);
  }
}
