import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

type RepositoryIssuesParams = {
  owner?: string;
  repo?: string;
};

export default function RepositoryIssuesScreen() {
  const { owner, repo } = useLocalSearchParams<RepositoryIssuesParams>();

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Issues abertas</Text>
      <Text style={styles.title}>
        {owner}/{repo}
      </Text>
      <Text style={styles.description}>
        Esta tela exibira issues paginadas, labels, autor, data relativa e pull-to-refresh.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 24,
    paddingTop: 40,
    backgroundColor: '#ffffff',
  },
  eyebrow: {
    color: '#0969da',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    color: '#24292f',
    fontSize: 28,
    fontWeight: '800',
  },
  description: {
    color: '#57606a',
    fontSize: 16,
    lineHeight: 24,
  },
});
