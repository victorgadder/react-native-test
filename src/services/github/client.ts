import { createGitHubError, GitHubApiError } from './errors';
import type { GitHubIssue, GitHubRepository, GitHubSearchRepositoriesResponse } from './types';

const GITHUB_API_BASE_URL = 'https://api.github.com';
const DEFAULT_PER_PAGE = 20;

type RequestParams = Record<string, number | string | undefined>;

function buildUrl(path: string, params?: RequestParams) {
  const url = new URL(`${GITHUB_API_BASE_URL}${path}`);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

async function requestGitHub<T>(path: string, params?: RequestParams): Promise<T> {
  const token = process.env.EXPO_PUBLIC_GITHUB_TOKEN;

  try {
    const response = await fetch(buildUrl(path, params), {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const payload = await response.json();

    if (!response.ok) {
      throw createGitHubError(response, payload);
    }

    return payload as T;
  } catch (error) {
    if (error instanceof GitHubApiError) {
      throw error;
    }

    throw new GitHubApiError(
      'Nao foi possivel conectar ao GitHub. Verifique sua conexao e tente novamente.',
      'network',
    );
  }
}

export function searchRepositories(query: string, page = 1) {
  return requestGitHub<GitHubSearchRepositoriesResponse>('/search/repositories', {
    order: 'desc',
    page,
    per_page: DEFAULT_PER_PAGE,
    q: query,
    sort: 'stars',
  });
}

export function getRepository(owner: string, repo: string) {
  return requestGitHub<GitHubRepository>(`/repos/${owner}/${repo}`);
}

export function getRepositoryIssues(owner: string, repo: string, page = 1) {
  return requestGitHub<GitHubIssue[]>(`/repos/${owner}/${repo}/issues`, {
    page,
    per_page: DEFAULT_PER_PAGE,
    state: 'open',
  });
}

export const githubPagination = {
  perPage: DEFAULT_PER_PAGE,
};
