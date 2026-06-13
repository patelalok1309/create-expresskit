import type { GeneratorContext } from '../types/index.js';

export interface Plugin {
  /** Human-readable name used in logging */
  name: string;
  /** Return true if this plugin should run for the given context */
  shouldRun(ctx: GeneratorContext): boolean;
  /** Perform the plugin's generation work */
  apply(ctx: GeneratorContext): Promise<void>;
}
