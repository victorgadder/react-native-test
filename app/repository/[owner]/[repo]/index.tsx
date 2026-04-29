import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

type RepositoryDetailsParams = {
  owner?: string;
  repo?: string;
};

export default function RepositoryDetailsScreen() {
  const { owner, repo } = useLocalSearchParams<RepositoryDetailsParams>();

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Repositorio</Text>
      <Text style={styles.title}>
        {owner}/{repo}
      </Text>
      <Text style={styles.description}>
        Esta tela exibira detalhes, avatar do owner, metricas e acao para abrir issues.
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
