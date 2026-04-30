import { Stack } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet, View } from 'react-native';

import { Button, Heading, Skeleton, Surface, Text, useTheme } from '@/src/design-system';
import type { GitHubIssue } from '@/src/services/github';

import { IssueCard } from './IssueCard';
import { useRepositoryIssues } from './hooks';

export type RepositoryIssuesScreenProps = {
  owner?: string;
  repo?: string;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Não foi possível carregar as issues. Tente novamente.';
}

export function RepositoryIssuesScreen({ owner, repo }: RepositoryIssuesScreenProps) {
  const { theme } = useTheme();
  const issuesQuery = useRepositoryIssues(owner, repo);
  const issues = useMemo(
    () => issuesQuery.data?.pages.flatMap((page) => page) ?? [],
    [issuesQuery.data],
  );
  const shouldShowEndOfList =
    issues.length > 0 &&
    !issuesQuery.hasNextPage &&
    !issuesQuery.isFetchingNextPage &&
    !issuesQuery.isLoading;

  const handleRefresh = () => {
    issuesQuery.refetch();
  };

  const handleEndReached = () => {
    if (issuesQuery.hasNextPage && !issuesQuery.isFetchingNextPage) {
      issuesQuery.fetchNextPage();
    }
  };

  const renderIssue: ListRenderItem<GitHubIssue> = ({ item }) => <IssueCard issue={item} />;

  if (!owner || !repo) {
    return (
      <ScreenState>
        <Heading level={3} tone="danger">
          Rota inválida
        </Heading>
        <Text tone="muted">Não foi possível identificar o repositório selecionado.</Text>
      </ScreenState>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Issues' }} />
      <FlatList
        contentContainerStyle={[
          styles.content,
          {
            backgroundColor: theme.colors.background,
            gap: theme.spacing.md,
            padding: theme.spacing.lg,
            paddingTop: theme.spacing.xl,
          },
        ]}
        data={issues}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <IssuesEmptyState
            errorMessage={issuesQuery.isError ? getErrorMessage(issuesQuery.error) : undefined}
            isLoading={issuesQuery.isLoading}
            onRetry={() => issuesQuery.refetch()}
          />
        }
        ListFooterComponent={
          <IssuesFooter
            hasEndMessage={shouldShowEndOfList}
            isFetchingNextPage={issuesQuery.isFetchingNextPage}
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text size="sm" tone="primary" variant="label" weight="bold">
              Issues abertas
            </Text>
            <Heading>
              {owner}/{repo}
            </Heading>
            <Text tone="muted">Acompanhe as discussões abertas neste repositório.</Text>
          </View>
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            onRefresh={handleRefresh}
            refreshing={issuesQuery.isRefetching && !issuesQuery.isFetchingNextPage}
            tintColor={theme.colors.primary}
          />
        }
        renderItem={renderIssue}
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      />
    </>
  );
}

type IssuesEmptyStateProps = {
  errorMessage?: string;
  isLoading: boolean;
  onRetry: () => void;
};

function IssuesEmptyState({ errorMessage, isLoading, onRetry }: IssuesEmptyStateProps) {
  if (isLoading) {
    return <Skeleton lines={4} />;
  }

  if (errorMessage) {
    return (
      <ScreenState>
        <Heading level={3} tone="danger">
          Algo deu errado
        </Heading>
        <Text tone="muted">{errorMessage}</Text>
        <Button onPress={onRetry} variant="outline">
          Tentar novamente
        </Button>
      </ScreenState>
    );
  }

  return (
    <ScreenState>
      <Heading level={3}>Sem issues abertas</Heading>
      <Text tone="muted">Este repositório não possui issues abertas no momento.</Text>
    </ScreenState>
  );
}

type IssuesFooterProps = {
  hasEndMessage: boolean;
  isFetchingNextPage: boolean;
};

function IssuesFooter({ hasEndMessage, isFetchingNextPage }: IssuesFooterProps) {
  if (isFetchingNextPage) {
    return <Skeleton lines={2} />;
  }

  if (hasEndMessage) {
    return (
      <View style={styles.footer}>
        <Text size="sm" tone="muted">
          Fim das issues abertas.
        </Text>
      </View>
    );
  }

  return null;
}

type ScreenStateProps = {
  children: React.ReactNode;
};

function ScreenState({ children }: ScreenStateProps) {
  return <Surface>{children}</Surface>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  header: {
    gap: 12,
  },
});
