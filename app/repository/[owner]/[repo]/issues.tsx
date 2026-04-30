import { useLocalSearchParams } from 'expo-router';

import { RepositoryIssuesScreen } from '@/src/features/issues';

type RepositoryIssuesParams = {
  owner?: string;
  repo?: string;
};

export default function RepositoryIssuesRoute() {
  const { owner, repo } = useLocalSearchParams<RepositoryIssuesParams>();

  return <RepositoryIssuesScreen owner={owner} repo={repo} />;
}
