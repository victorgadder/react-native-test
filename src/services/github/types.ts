export type GitHubOwner = {
  avatar_url: string;
  html_url: string;
  id: number;
  login: string;
};

export type GitHubRepository = {
  description: string | null;
  forks_count: number;
  full_name: string;
  html_url: string;
  id: number;
  language: string | null;
  name: string;
  open_issues_count: number;
  owner: GitHubOwner;
  stargazers_count: number;
  watchers_count: number;
};

export type GitHubSearchRepositoriesResponse = {
  incomplete_results: boolean;
  items: GitHubRepository[];
  total_count: number;
};

export type GitHubLabel = {
  color: string;
  id: number;
  name: string;
};

export type GitHubIssueUser = {
  avatar_url: string;
  id: number;
  login: string;
};

export type GitHubIssue = {
  created_at: string;
  html_url: string;
  id: number;
  labels: GitHubLabel[];
  number: number;
  title: string;
  user: GitHubIssueUser;
};
