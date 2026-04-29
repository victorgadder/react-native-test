import { StyleSheet, View } from 'react-native';

import { Heading, Text, useTheme } from '@/src/design-system';

export default function RepositorySearchScreen() {
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
      <Text size="sm" tone="primary" variant="label" weight="bold">
        GitHub Explorer
      </Text>
      <Heading>Busca de repositorios</Heading>
      <Text tone="muted">
        Esta tela recebera o campo de busca, a lista paginada, pull-to-refresh e estados de erro.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});
