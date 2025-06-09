export function makeCacheKey(...parts: string[]): string {
  return parts.join(':');
}

export function makeCacheKeyWithPrefix(...parts: string[]): string {
  return process.env.REDIS_PREFIX_KEY + makeCacheKey(...parts);
}
