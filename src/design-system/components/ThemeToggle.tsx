import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet } from 'react-native';

import { useTheme } from '../theme';

export function ThemeToggle() {
  const { mode, theme, toggleMode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <Pressable
      accessibilityLabel={isDark ? 'Ativar tema light' : 'Ativar tema dark'}
      accessibilityRole="switch"
      accessibilityState={{ checked: isDark }}
      onPress={toggleMode}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
        },
      ]}
    >
      <FontAwesome color={theme.colors.text} name={isDark ? 'moon-o' : 'sun-o'} size={18} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    marginRight: 16,
    width: 36,
  },
});
