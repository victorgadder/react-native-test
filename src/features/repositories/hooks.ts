import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
  getRepository,
  githubPagination,
  GitHubRepository,
  GitHubSearchRepositoriesResponse,
  searchRepositories,
} from '@/src/services/github';

export const repositoryQueryKeys = {
  detail: (owner: string, repo: string) => ['repositories', 'detail', owner, repo] as const,
  search: (query: string) => ['repositories', 'search', query] as const,
};

export function useSearchRepositories(query: string) {
  const normalizedQuery = query.trim();

  return useInfiniteQuery<GitHubSearchRepositoriesResponse>({
    enabled: normalizedQuery.length >= 2,
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.reduce((total, page) => total + page.items.length, 0);

      if (loadedItems >= lastPage.total_count || lastPage.items.length < githubPagination.perPage) {
        return undefined;
      }

      return allPages.length + 1;
    },
    initialPageParam: 1,
    queryFn: ({ pageParam }) => searchRepositories(normalizedQuery, Number(pageParam)),
    queryKey: repositoryQueryKeys.search(normalizedQuery),
  });
}

export function useRepositoryDetails(owner?: string, repo?: string) {
  return useQuery<GitHubRepository>({
    enabled: Boolean(owner && repo),
    queryFn: () => getRepository(owner as string, repo as string),
    queryKey: repositoryQueryKeys.detail(owner ?? '', repo ?? ''),
  });
}
