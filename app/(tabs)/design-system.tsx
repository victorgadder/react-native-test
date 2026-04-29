import { ScrollView, StyleSheet, View } from 'react-native';

import { Button, Heading, Text, useTheme } from '@/src/design-system';

export default function DesignSystemShowcaseScreen() {
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
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <View style={styles.section}>
        <Text size="sm" tone="primary" variant="label" weight="bold">
          Showcase
        </Text>
        <Heading>Design System</Heading>
        <Text tone="muted">
          Esta tela exibira tokens, temas e componentes base em variacoes, tamanhos e estados.
        </Text>
      </View>

      <View style={styles.section}>
        <Heading level={2}>Tipografia</Heading>
        <Heading level={1}>Heading nivel 1</Heading>
        <Heading level={2}>Heading nivel 2</Heading>
        <Heading level={3}>Heading nivel 3</Heading>
        <Text>Texto body padrao usando tokens do tema.</Text>
        <Text size="sm" tone="muted">
          Texto muted em tamanho sm.
        </Text>
        <Text size="xs" tone="primary" variant="label" weight="bold">
          Label xs primary
        </Text>
      </View>

      <View style={styles.section}>
        <Heading level={2}>Botoes</Heading>
        <View style={styles.row}>
          <Button size="sm">Primary sm</Button>
          <Button>Primary md</Button>
          <Button size="lg">Primary lg</Button>
        </View>
        <View style={styles.row}>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </View>
        <View style={styles.row}>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  section: {
    gap: 12,
  },
});
