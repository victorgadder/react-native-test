import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Href, Stack, useRouter } from 'expo-router';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';

import {
  Avatar,
  Badge,
  Button,
  Card,
  Heading,
  Skeleton,
  Surface,
  Text,
  useTheme,
} from '@/src/design-system';
import { formatCount } from '@/src/utils';

import { useRepositoryDetails } from './hooks';

export type RepositoryDetailsScreenProps = {
  owner?: string;
  repo?: string;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Não foi possível carregar os detalhes do repositório. Tente novamente.';
}

export function RepositoryDetailsScreen({ owner, repo }: RepositoryDetailsScreenProps) {
  const router = useRouter();
  const repositoryQuery = useRepositoryDetails(owner, repo);
  const repository = repositoryQuery.data;

  const handleOpenIssues = () => {
    if (!owner || !repo) {
      return;
    }

    router.push(`/repository/${owner}/${repo}/issues` as Href);
  };

  if (!owner || !repo) {
    return (
      <ScreenShell>
        <Surface>
          <Heading level={3} tone="danger">
            Rota inválida
          </Heading>
          <Text tone="muted">Não foi possível identificar o repositório selecionado.</Text>
        </Surface>
      </ScreenShell>
    );
  }

  if (repositoryQuery.isLoading) {
    return (
      <ScreenShell>
        <Skeleton lines={5} />
        <Skeleton lines={3} />
      </ScreenShell>
    );
  }

  if (repositoryQuery.isError || !repository) {
    return (
      <ScreenShell>
        <Surface>
          <Heading level={3} tone="danger">
            Algo deu errado
          </Heading>
          <Text tone="muted">{getErrorMessage(repositoryQuery.error)}</Text>
          <Button onPress={() => repositoryQuery.refetch()} variant="outline">
            Tentar novamente
          </Button>
        </Surface>
      </ScreenShell>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: repository.name }} />
      <ScreenShell>
        <View style={styles.header}>
          <Avatar name={repository.owner.login} size="xl" sourceUri={repository.owner.avatar_url} />
          <View style={styles.titleBlock}>
            <Text size="sm" tone="primary" variant="label" weight="bold">
              Repositório
            </Text>
            <Heading>{repository.full_name}</Heading>
            <Text tone="muted">{repository.owner.login}</Text>
          </View>
        </View>

        <Card>
          <Heading level={2}>Descrição</Heading>
          <Text tone="muted">{repository.description ?? 'Repositório sem descrição.'}</Text>
          <View style={styles.badgeRow}>
            {repository.language ? <Badge variant="outline">{repository.language}</Badge> : null}
            <Badge tone="success" variant="outline">
              {`${repository.open_issues_count} issues abertas`}
            </Badge>
          </View>
        </Card>

        <View style={styles.metricsGrid}>
          <MetricCard icon="star" label="Stars" value={formatCount(repository.stargazers_count)} />
          <MetricCard icon="code-fork" label="Forks" value={formatCount(repository.forks_count)} />
          <MetricCard icon="eye" label="Watchers" value={formatCount(repository.watchers_count)} />
        </View>

        <View style={styles.actions}>
          <Button onPress={handleOpenIssues} size="lg">
            Abrir issues
          </Button>
          <Button onPress={() => Linking.openURL(repository.html_url)} size="lg" variant="outline">
            Abrir no GitHub
          </Button>
        </View>
      </ScreenShell>
    </>
  );
}

type ScreenShellProps = {
  children: React.ReactNode;
};

function ScreenShell({ children }: ScreenShellProps) {
  const { theme } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        {
          gap: theme.spacing.lg,
          padding: theme.spacing.lg,
          paddingTop: theme.spacing.xl,
        },
      ]}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {children}
    </ScrollView>
  );
}

type MetricCardProps = {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  label: string;
  value: string;
};

function MetricCard({ icon, label, value }: MetricCardProps) {
  const { theme } = useTheme();

  return (
    <Surface padding="sm">
      <View style={styles.metricHeader}>
        <FontAwesome color={theme.colors.primary} name={icon} size={16} />
        <Text size="sm" tone="muted" weight="medium">
          {label}
        </Text>
      </View>
      <Heading level={2}>{value}</Heading>
    </Surface>
  );
}

const styles = StyleSheet.create({
  actions: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  metricHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  metricsGrid: {
    gap: 12,
  },
  titleBlock: {
    flex: 1,
    gap: 4,
  },
});
