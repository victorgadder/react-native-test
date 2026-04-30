import { useInfiniteQuery } from '@tanstack/react-query';

import { getRepositoryIssues, githubPagination, GitHubIssue } from '@/src/services/github';

export const issueQueryKeys = {
  list: (owner: string, repo: string) => ['issues', owner, repo] as const,
};

export function useRepositoryIssues(owner?: string, repo?: string) {
  return useInfiniteQuery<GitHubIssue[]>({
    enabled: Boolean(owner && repo),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < githubPagination.perPage) {
        return undefined;
      }

      return allPages.length + 1;
    },
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getRepositoryIssues(owner as string, repo as string, Number(pageParam)),
    queryKey: issueQueryKeys.list(owner ?? '', repo ?? ''),
  });
}
