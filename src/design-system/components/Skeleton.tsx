import { StyleSheet, View } from 'react-native';

import { useTheme } from '../theme';

export type SkeletonProps = {
  lines?: number;
};

export function Skeleton({ lines = 3 }: SkeletonProps) {
  const { theme } = useTheme();

  return (
    <View
      accessibilityLabel="Carregando conteúdo"
      accessibilityRole="progressbar"
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
          padding: theme.spacing.md,
        },
      ]}
    >
      {Array.from({ length: lines }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.line,
            {
              backgroundColor: theme.colors.border,
              borderRadius: theme.radius.sm,
              opacity: theme.mode === 'dark' ? 0.42 : 0.7,
              width: index === lines - 1 ? '58%' : '100%',
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    gap: 12,
    width: '100%',
  },
  line: {
    height: 14,
  },
});
