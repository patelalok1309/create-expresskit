import type { Plugin } from './types.js';
import type { GeneratorContext } from '../types/index.js';
import { CommonPlugin } from './common.plugin.js';
import { TypeScriptPlugin } from './typescript.plugin.js';
import { JavaScriptPlugin } from './javascript.plugin.js';
import { MongoDbPlugin } from './mongodb.plugin.js';
import { RedisPlugin } from './redis.plugin.js';
import { DockerPlugin } from './docker.plugin.js';

/** Ordered list of all registered plugins. Order matters — common runs first. */
const ALL_PLUGINS: Plugin[] = [
  new CommonPlugin(),
  new TypeScriptPlugin(),
  new JavaScriptPlugin(),
  new MongoDbPlugin(),
  new RedisPlugin(),
  new DockerPlugin(),
];

/**
 * Return the subset of plugins that should run for the given context.
 * Order is preserved so plugins compose predictably.
 */
export function getActivePlugins(ctx: GeneratorContext): Plugin[] {
  return ALL_PLUGINS.filter((plugin) => plugin.shouldRun(ctx));
}
