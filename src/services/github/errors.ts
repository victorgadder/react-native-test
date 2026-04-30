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
      'Limite de requisicoes do GitHub excedido. Tente novamente mais tarde ou configure um GITHUB_TOKEN.',
      'rate-limit',
      response.status,
    );
  }

  if (response.status === 404) {
    return new GitHubApiError('Repositorio nao encontrado.', 'not-found', response.status);
  }

  return new GitHubApiError(
    'Nao foi possivel carregar os dados do GitHub. Tente novamente.',
    'unknown',
    response.status,
  );
}
