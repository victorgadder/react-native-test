import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, View } from 'react-native';

import { Avatar, Badge, Card, Heading, Text, useTheme } from '@/src/design-system';
import type { GitHubRepository } from '@/src/services/github';

export type RepositoryCardProps = {
  onPress: () => void;
  repository: GitHubRepository;
};

function formatCount(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  }

  return String(value);
}

export function RepositoryCard({ onPress, repository }: RepositoryCardProps) {
  const { theme } = useTheme();

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.pressable}>
      {({ pressed }) => (
        <Card elevated={pressed}>
          <View style={styles.header}>
            <Avatar
              name={repository.owner.login}
              size="md"
              sourceUri={repository.owner.avatar_url}
            />
            <View style={styles.titleBlock}>
              <Heading level={3}>{repository.name}</Heading>
              <Text size="sm" tone="muted">
                {repository.owner.login}
              </Text>
            </View>
          </View>

          {repository.description ? (
            <Text tone="muted">{repository.description}</Text>
          ) : (
            <Text tone="muted">Repositorio sem descricao.</Text>
          )}

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <FontAwesome color={theme.colors.warning} name="star" size={14} />
              <Text size="sm" weight="medium">
                {formatCount(repository.stargazers_count)}
              </Text>
            </View>
            {repository.language ? <Badge variant="outline">{repository.language}</Badge> : null}
          </View>
        </Card>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pressable: {
    width: '100%',
  },
  titleBlock: {
    flex: 1,
  },
});
