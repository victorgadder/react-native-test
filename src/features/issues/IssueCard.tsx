import { StyleSheet, View } from 'react-native';

import { Avatar, Badge, Card, Heading, Text } from '@/src/design-system';
import type { GitHubIssue } from '@/src/services/github';
import { formatRelativeDate } from '@/src/utils';

export type IssueCardProps = {
  issue: GitHubIssue;
};

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <Card>
      <View style={styles.header}>
        <Avatar name={issue.user.login} size="sm" sourceUri={issue.user.avatar_url} />
        <View style={styles.titleBlock}>
          <Heading level={3}>{issue.title}</Heading>
          <Text size="sm" tone="muted">
            #{issue.number} por {issue.user.login} · {formatRelativeDate(issue.created_at)}
          </Text>
        </View>
      </View>

      {issue.labels.length > 0 ? (
        <View style={styles.labels}>
          {issue.labels.map((label) => (
            <Badge key={label.id} tone="muted" variant="outline">
              {label.name}
            </Badge>
          ))}
        </View>
      ) : (
        <Text size="sm" tone="muted">
          Sem labels
        </Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  labels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  titleBlock: {
    flex: 1,
    gap: 4,
  },
});
