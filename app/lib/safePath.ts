import fs from 'fs';
import path from 'path';

/** Resolve a path under the examples root; return null if it would escape. */
export function resolveUnderExamples(...parts: string[]): string | null {
  const root = path.resolve(process.cwd(), '..', 'examples');
  for (const part of parts) {
    if (!part || part.includes('\0')) return null;
    const segments = part.replace(/\\/g, '/').split('/');
    if (segments.some((s) => s === '..' || path.isAbsolute(s))) return null;
  }
  const joined = path.resolve(root, ...parts);
  const rel = path.relative(root, joined);
  if (rel.startsWith('..') || path.isAbsolute(rel)) return null;
  return joined;
}

export function readTextUnderExamples(...parts: string[]): string | null {
  const target = resolveUnderExamples(...parts);
  if (!target || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
    return null;
  }
  return fs.readFileSync(target, 'utf-8');
}
