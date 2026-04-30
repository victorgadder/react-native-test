import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Avatar, Badge, Card, Heading, Text, useTheme } from '@/src/design-system';
import type { GitHubRepository } from '@/src/services/github';

export type RepositoryCardProps = {
  onPress: () => void;
  repository: GitHubRepository;
};

const DEFAULT_DESCRIPTION_LINES = 7;

function formatCount(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  }

  return String(value);
}

export function RepositoryCard({ onPress, repository }: RepositoryCardProps) {
  const { theme } = useTheme();
  const [descriptionLineCount, setDescriptionLineCount] = useState(0);
  const [visibleDescriptionLines, setVisibleDescriptionLines] = useState(DEFAULT_DESCRIPTION_LINES);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const description = repository.description ?? 'Repositório sem descrição.';

  const descriptionNumberOfLines = isDescriptionExpanded ? undefined : visibleDescriptionLines;
  const hasLongDescription = useMemo(
    () => descriptionLineCount > DEFAULT_DESCRIPTION_LINES || description.length > 320,
    [description.length, descriptionLineCount],
  );
  const hasDescriptionFullyVisible =
    isDescriptionExpanded ||
    (descriptionLineCount > 0 && visibleDescriptionLines >= descriptionLineCount);

  const handleReadMore = () => {
    setVisibleDescriptionLines((current) => current + DEFAULT_DESCRIPTION_LINES);
  };

  const handleReadAll = () => {
    setIsDescriptionExpanded(true);
  };

  const handleCollapse = () => {
    setIsDescriptionExpanded(false);
    setVisibleDescriptionLines(DEFAULT_DESCRIPTION_LINES);
  };

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

          <View style={styles.descriptionBlock}>
            <Text
              numberOfLines={descriptionNumberOfLines}
              onTextLayout={(event) => {
                setDescriptionLineCount(event.nativeEvent.lines.length);
              }}
              tone="muted"
            >
              {description}
            </Text>

            {hasLongDescription ? (
              <View style={styles.descriptionActions}>
                {hasDescriptionFullyVisible ? (
                  <Text
                    onPress={(event) => {
                      event.stopPropagation();
                      handleCollapse();
                    }}
                    size="sm"
                    tone="primary"
                    weight="bold"
                  >
                    recolher descrição
                  </Text>
                ) : (
                  <>
                    <Text
                      onPress={(event) => {
                        event.stopPropagation();
                        handleReadMore();
                      }}
                      size="sm"
                      tone="primary"
                      weight="bold"
                    >
                      ler mais
                    </Text>
                    <Text
                      onPress={(event) => {
                        event.stopPropagation();
                        handleReadAll();
                      }}
                      size="sm"
                      tone="primary"
                      weight="bold"
                    >
                      ler tudo
                    </Text>
                  </>
                )}
              </View>
            ) : null}
          </View>

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
  descriptionActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  descriptionBlock: {
    gap: 8,
  },
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
