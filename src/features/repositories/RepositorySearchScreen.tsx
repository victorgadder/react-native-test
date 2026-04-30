import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

import { Button, Heading, Input, Surface, Text, useTheme } from '@/src/design-system';
import { GitHubRepository } from '@/src/services/github';

import { RepositoryCard } from './RepositoryCard';
import { useSearchRepositories } from './hooks';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Nao foi possivel buscar repositorios. Tente novamente.';
}

export function RepositorySearchScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [query, setQuery] = useState('react native');
  const searchQuery = query.trim();
  const repositoriesQuery = useSearchRepositories(searchQuery);

  const repositories = useMemo(
    () => repositoriesQuery.data?.pages.flatMap((page) => page.items) ?? [],
    [repositoriesQuery.data],
  );

  const shouldShowInitialEmpty = searchQuery.length < 2;
  const shouldShowNoResults =
    !repositoriesQuery.isLoading &&
    !repositoriesQuery.isError &&
    searchQuery.length >= 2 &&
    repositories.length === 0;

  const handleRefresh = () => {
    repositoriesQuery.refetch();
  };

  const handleEndReached = () => {
    if (repositoriesQuery.hasNextPage && !repositoriesQuery.isFetchingNextPage) {
      repositoriesQuery.fetchNextPage();
    }
  };

  const renderRepository: ListRenderItem<GitHubRepository> = ({ item }) => (
    <RepositoryCard
      onPress={() =>
        router.push({
          pathname: '/repository/[owner]/[repo]/index',
          params: {
            owner: item.owner.login,
            repo: item.name,
          },
        })
      }
      repository={item}
    />
  );

  return (
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
      data={repositories}
      keyExtractor={(item) => String(item.id)}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        <SearchEmptyState
          errorMessage={
            repositoriesQuery.isError ? getErrorMessage(repositoriesQuery.error) : undefined
          }
          isLoading={repositoriesQuery.isLoading}
          noResults={shouldShowNoResults}
          waitingForQuery={shouldShowInitialEmpty}
        />
      }
      ListFooterComponent={
        repositoriesQuery.isFetchingNextPage ? (
          <View style={styles.footer}>
            <ActivityIndicator color={theme.colors.primary} />
          </View>
        ) : null
      }
      ListHeaderComponent={
        <View style={styles.header}>
          <Text size="sm" tone="primary" variant="label" weight="bold">
            GitHub Explorer
          </Text>
          <Heading>Busca de repositorios</Heading>
          <Text tone="muted">Encontre repositorios publicos do GitHub ordenados por estrelas.</Text>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            helperText="Exemplos: react native, typescript, expo"
            label="Busca"
            onChangeText={setQuery}
            placeholder="react native"
            returnKeyType="search"
            value={query}
          />
        </View>
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          colors={[theme.colors.primary]}
          onRefresh={handleRefresh}
          refreshing={repositoriesQuery.isRefetching && !repositoriesQuery.isFetchingNextPage}
          tintColor={theme.colors.primary}
        />
      }
      renderItem={renderRepository}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    />
  );
}

type SearchEmptyStateProps = {
  errorMessage?: string;
  isLoading: boolean;
  noResults: boolean;
  waitingForQuery: boolean;
};

function SearchEmptyState({
  errorMessage,
  isLoading,
  noResults,
  waitingForQuery,
}: SearchEmptyStateProps) {
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <Surface>
        <ActivityIndicator color={theme.colors.primary} />
        <Text tone="muted">Buscando repositorios...</Text>
      </Surface>
    );
  }

  if (errorMessage) {
    return (
      <Surface>
        <Heading level={3} tone="danger">
          Algo deu errado
        </Heading>
        <Text tone="muted">{errorMessage}</Text>
        <Button onPress={() => undefined} variant="outline">
          Tente puxar para atualizar
        </Button>
      </Surface>
    );
  }

  if (noResults) {
    return (
      <Surface>
        <Heading level={3}>Sem resultados</Heading>
        <Text tone="muted">Nenhum repositorio encontrado para essa busca.</Text>
      </Surface>
    );
  }

  if (waitingForQuery) {
    return (
      <Surface>
        <Heading level={3}>Digite uma busca</Heading>
        <Text tone="muted">Use pelo menos 2 caracteres para iniciar a busca.</Text>
      </Surface>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  footer: {
    paddingVertical: 16,
  },
  header: {
    gap: 12,
  },
});
