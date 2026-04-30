import { useLocalSearchParams } from 'expo-router';

import { RepositoryDetailsScreen } from '@/src/features/repositories';

type RepositoryDetailsParams = {
  owner?: string;
  repo?: string;
};

export default function RepositoryDetailsRoute() {
  const { owner, repo } = useLocalSearchParams<RepositoryDetailsParams>();

  return <RepositoryDetailsScreen owner={owner} repo={repo} />;
}
