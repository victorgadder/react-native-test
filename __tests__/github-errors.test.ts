import { createGitHubError } from '@/src/services/github/errors';

describe('createGitHubError', () => {
  it('returns a friendly rate-limit error', () => {
    const error = createGitHubError({ status: 403 } as Response, {
      message: 'API rate limit exceeded',
    });

    expect(error.kind).toBe('rate-limit');
    expect(error.message).toContain('EXPO_PUBLIC_GITHUB_TOKEN');
  });

  it('returns a not-found error for 404 responses', () => {
    const error = createGitHubError({ status: 404 } as Response);

    expect(error.kind).toBe('not-found');
    expect(error.message).toBe('Repositório não encontrado.');
  });
});
