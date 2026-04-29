import { StyleSheet, Text, View } from 'react-native';

import { ThemeToggle, useTheme } from '@/src/design-system';

export default function DesignSystemShowcaseScreen() {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          gap: theme.spacing.md,
          padding: theme.spacing.lg,
          paddingTop: theme.spacing.xl,
        },
      ]}
    >
      <Text style={[styles.eyebrow, { color: theme.colors.primary }]}>Showcase</Text>
      <Text style={[styles.title, { color: theme.colors.text }]}>Design System</Text>
      <Text style={[styles.description, { color: theme.colors.muted }]}>
        Esta tela exibira tokens, temas e componentes base em variacoes, tamanhos e estados.
      </Text>
      <ThemeToggle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});
