import { View, ViewProps, StyleSheet } from 'react-native';

import { useTheme } from '../theme';

export type SurfaceProps = Omit<ViewProps, 'style'> & {
  children: React.ReactNode;
  elevated?: boolean;
  padding?: 'sm' | 'md' | 'lg';
};

export function Surface({ children, elevated = false, padding = 'md', ...props }: SurfaceProps) {
  const { theme } = useTheme();

  return (
    <View
      {...props}
      style={[
        styles.surface,
        elevated && styles.elevated,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
          padding: theme.spacing[padding],
        },
      ]}
    >
      {children}
    </View>
  );
}

export const Card = Surface;

const styles = StyleSheet.create({
  elevated: {
    elevation: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  surface: {
    borderWidth: 1,
    gap: 12,
    shadowColor: '#000000',
    width: '100%',
  },
});
