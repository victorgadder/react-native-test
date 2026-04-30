export type GitHubErrorKind = 'rate-limit' | 'not-found' | 'network' | 'unknown';

export class GitHubApiError extends Error {
  kind: GitHubErrorKind;
  status?: number;

  constructor(message: string, kind: GitHubErrorKind, status?: number) {
    super(message);
    this.name = 'GitHubApiError';
    this.kind = kind;
    this.status = status;
  }
}

type GitHubErrorPayload = {
  message?: string;
};

export function createGitHubError(response: Response, payload?: GitHubErrorPayload) {
  const message = payload?.message?.toLowerCase() ?? '';

  if (response.status === 403 && message.includes('rate limit')) {
    return new GitHubApiError(
      'Limite de requisições do GitHub excedido. Tente novamente mais tarde ou configure um EXPO_PUBLIC_GITHUB_TOKEN.',
      'rate-limit',
      response.status,
    );
  }

  if (response.status === 404) {
    return new GitHubApiError('Repositório não encontrado.', 'not-found', response.status);
  }

  return new GitHubApiError(
    'Não foi possível carregar os dados do GitHub. Tente novamente.',
    'unknown',
    response.status,
  );
}
