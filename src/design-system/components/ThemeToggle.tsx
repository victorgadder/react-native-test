import { Pressable, StyleSheet, Text } from 'react-native';

import { useTheme } from '../theme';

export function ThemeToggle() {
  const { mode, theme, toggleMode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: isDark }}
      onPress={toggleMode}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
        },
      ]}
    >
      <Text style={[styles.label, { color: theme.colors.text }]}>
        {isDark ? 'Tema dark' : 'Tema light'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
});
