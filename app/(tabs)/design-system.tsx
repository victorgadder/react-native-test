import { StyleSheet, Text, View } from 'react-native';

export default function DesignSystemShowcaseScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Showcase</Text>
      <Text style={styles.title}>Design System</Text>
      <Text style={styles.description}>
        Esta tela exibira tokens, temas e componentes base em variacoes, tamanhos e estados.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    justifyContent: 'flex-start',
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
