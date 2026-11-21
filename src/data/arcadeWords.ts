/**
 * Graded vocabulary for Typing Trainer Arcade modes
 * Clean-room, 100% original curated word pools
 */

export interface WordPools {
  easy: string[];
  medium: string[];
  hard: string[];
  code: string[];
}

export const ARCADE_WORD_POOLS: WordPools = {
  easy: [
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'any', 'can',
    'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him',
    'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who',
    'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use', 'dad',
    'fast', 'wind', 'star', 'fire', 'glow', 'pure', 'gold', 'wave', 'blue', 'drop',
    'echo', 'flux', 'moon', 'beam', 'dark', 'dawn', 'dusk', 'calm', 'soft', 'bold'
  ],
  medium: [
    'swift', 'flame', 'spark', 'laser', 'orbit', 'matrix', 'cyber', 'rocket',
    'nexus', 'hyper', 'pulse', 'sonic', 'pixel', 'turbo', 'quantum', 'stream',
    'vector', 'shadow', 'engine', 'beacon', 'cosmos', 'galaxy', 'planet', 'syntax',
    'flight', 'rhythm', 'dynamo', 'shield', 'spring', 'strike', 'sphere', 'timber',
    'silver', 'zenith', 'canyon', 'horizon', 'glacier', 'breeze', 'stride', 'zenith',
    'vertex', 'binary', 'crypto', 'signal', 'sensor', 'portal', 'plasma', 'meteor'
  ],
  hard: [
    'algorithm', 'benchmark', 'bandwidth', 'precision', 'execution', 'interface',
    'frequency', 'developer', 'framework', 'synthesis', 'telemetry', 'dimension',
    'structure', 'transistor', 'processor', 'resilience', 'synchronous', 'parameter',
    'coordinate', 'navigation', 'atmosphere', 'chronometer', 'constellation', 'encryption',
    'trajectory', 'equilibrium', 'microscopic', 'calibration', 'hexadecimal', 'resilient'
  ],
  code: [
    'const', 'return', 'async', 'export', 'import', 'function', 'boolean', 'string',
    'number', 'promise', 'typeof', 'interface', 'struct', 'vector', 'filter', 'reduce',
    'mutate', 'render', 'module', 'package', 'publish', 'release', 'deploy', 'assert',
    'console', 'virtual', 'pointer', 'channel', 'closure', 'payload', 'handler', 'request'
  ]
};

export function getRandomArcadeWord(category: keyof WordPools): string {
  const pool = ARCADE_WORD_POOLS[category] || ARCADE_WORD_POOLS.medium;
  return pool[Math.floor(Math.random() * pool.length)];
}
