import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('API_URL configuration', () => {
  it('uses localhost when the URL is missing in development', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('NEXT_PUBLIC_API_URL', undefined);
    vi.resetModules();

    const { API_URL } = await import('./config');
    expect(API_URL).toBe('http://localhost:3000');
  });

  it('fails clearly when the URL is missing in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_API_URL', undefined);
    vi.resetModules();

    await expect(import('./config')).rejects.toThrow(
      'NEXT_PUBLIC_API_URL must be set outside development.',
    );
  });
});
