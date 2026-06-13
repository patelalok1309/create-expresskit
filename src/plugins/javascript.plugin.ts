import type { Plugin } from './types.js';
import type { GeneratorContext } from '../types/index.js';

/**
 * JavaScript plugin — currently a no-op placeholder.
 * The common templates handle JS/TS differences via EJS conditionals.
 * This plugin exists as an extension point for future JS-specific additions
 * (e.g., jsconfig.json, Babel config, ESLint presets).
 */
export class JavaScriptPlugin implements Plugin {
  name = 'javascript';

  shouldRun(ctx: GeneratorContext): boolean {
    return !ctx.useTypeScript;
  }

  async apply(_ctx: GeneratorContext): Promise<void> {
    // Reserved for future JS-specific template additions
  }
}
