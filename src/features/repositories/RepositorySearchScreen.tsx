import AsyncStorage from '@react-native-async-storage/async-storage';
import { Href, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet, View } from 'react-native';

import { Button, Heading, Input, Skeleton, Surface, Text, useTheme } from '@/src/design-system';
import { GitHubRepository } from '@/src/services/github';
import { useDebouncedValue } from '@/src/utils/hooks';

import { RepositoryCard } from './RepositoryCard';
import { useSearchRepositories } from './hooks';

const LAST_SEARCH_STORAGE_KEY = '@react-native-test/last-search';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Não foi possível buscar repositórios. Tente novamente.';
}

export function RepositorySearchScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 500);
  const searchQuery = debouncedQuery.trim();
  const repositoriesQuery = useSearchRepositories(searchQuery);

  useEffect(() => {
    AsyncStorage.getItem(LAST_SEARCH_STORAGE_KEY).then((storedQuery) => {
      if (storedQuery) {
        setQuery(storedQuery);
      }
    });
  }, []);

  useEffect(() => {
    const normalizedQuery = query.trim();

    if (normalizedQuery.length >= 2) {
      AsyncStorage.setItem(LAST_SEARCH_STORAGE_KEY, normalizedQuery);
    }
  }, [query]);

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
  const shouldShowEndOfList =
    repositories.length > 0 &&
    !repositoriesQuery.hasNextPage &&
    !repositoriesQuery.isFetchingNextPage &&
    !repositoriesQuery.isLoading;

  const handleRefresh = () => {
    repositoriesQuery.refetch();
  };

  const handleEndReached = () => {
    if (repositoriesQuery.hasNextPage && !repositoriesQuery.isFetchingNextPage) {
      repositoriesQuery.fetchNextPage();
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    AsyncStorage.removeItem(LAST_SEARCH_STORAGE_KEY);
  };

  const renderRepository: ListRenderItem<GitHubRepository> = ({ item }) => (
    <RepositoryCard
      onPress={() => {
        const repositoryPath = `/repository/${item.owner.login}/${item.name}` as Href;

        router.push(repositoryPath);
      }}
      repository={item}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View
        style={[
          styles.fixedHeader,
          {
            backgroundColor: theme.colors.background,
            borderBottomColor: theme.colors.border,
            gap: theme.spacing.md,
            padding: theme.spacing.lg,
          },
        ]}
      >
        <View style={styles.header}>
          <Text size="sm" tone="primary" variant="label" weight="bold">
            GitHub Explorer
          </Text>
          <Heading>Busca de repositórios</Heading>
          <Text tone="muted">Encontre repositórios públicos do GitHub ordenados por estrelas.</Text>
          <Input
            accessibilityLabel="Termo de busca"
            autoCapitalize="none"
            autoCorrect={false}
            helperText="Exemplos: react native, typescript, expo"
            label="Busca"
            onChangeText={setQuery}
            placeholder="react native"
            returnKeyType="search"
            value={query}
          />
          {query.length > 0 ? (
            <Button onPress={handleClearSearch} size="sm" variant="ghost">
              Limpar busca
            </Button>
          ) : null}
        </View>
      </View>

      <FlatList
        contentContainerStyle={[
          styles.content,
          {
            backgroundColor: theme.colors.background,
            gap: theme.spacing.md,
            padding: theme.spacing.lg,
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
            isLoading={repositoriesQuery.isLoading || query.trim() !== searchQuery}
            noResults={shouldShowNoResults}
            onRetry={() => repositoriesQuery.refetch()}
            waitingForQuery={shouldShowInitialEmpty}
          />
        }
        ListFooterComponent={
          <SearchFooter
            hasEndMessage={shouldShowEndOfList}
            isFetchingNextPage={repositoriesQuery.isFetchingNextPage}
          />
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
        style={styles.list}
      />
    </View>
  );
}

type SearchEmptyStateProps = {
  errorMessage?: string;
  isLoading: boolean;
  noResults: boolean;
  onRetry: () => void;
  waitingForQuery: boolean;
};

function SearchEmptyState({
  errorMessage,
  isLoading,
  noResults,
  onRetry,
  waitingForQuery,
}: SearchEmptyStateProps) {
  if (isLoading) {
    return <Skeleton lines={4} />;
  }

  if (errorMessage) {
    return (
      <Surface>
        <Heading level={3} tone="danger">
          Algo deu errado
        </Heading>
        <Text tone="muted">{errorMessage}</Text>
        <Button onPress={onRetry} variant="outline">
          Tentar novamente
        </Button>
      </Surface>
    );
  }

  if (noResults) {
    return (
      <Surface>
        <Heading level={3}>Sem resultados</Heading>
        <Text tone="muted">Nenhum repositório encontrado para essa busca.</Text>
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

type SearchFooterProps = {
  hasEndMessage: boolean;
  isFetchingNextPage: boolean;
};

function SearchFooter({ hasEndMessage, isFetchingNextPage }: SearchFooterProps) {
  const { theme } = useTheme();

  if (isFetchingNextPage) {
    return <Skeleton lines={2} />;
  }

  if (hasEndMessage) {
    return (
      <View style={styles.footer}>
        <Text size="sm" tone="muted">
          Fim dos resultados.
        </Text>
      </View>
    );
  }

  return <View style={[styles.footer, { backgroundColor: theme.colors.background }]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  fixedHeader: {
    borderBottomWidth: 1,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  header: {
    gap: 12,
  },
  list: {
    flex: 1,
  },
});
