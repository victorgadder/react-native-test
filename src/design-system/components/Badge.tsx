import { StyleSheet, View } from 'react-native';

import { ColorToken, useTheme } from '../theme';
import { Text } from './Text';

type BadgeSize = 'sm' | 'md';
type BadgeTone = Extract<ColorToken, 'primary' | 'success' | 'warning' | 'danger' | 'muted'>;

export type BadgeProps = {
  children: string;
  size?: BadgeSize;
  tone?: BadgeTone;
  variant?: 'soft' | 'outline';
};

export function Badge({ children, size = 'md', tone = 'primary', variant = 'soft' }: BadgeProps) {
  const { theme } = useTheme();
  const isSoft = variant === 'soft';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: isSoft ? `${theme.colors[tone]}22` : 'transparent',
          borderColor: theme.colors[tone],
          borderRadius: theme.radius.sm,
          paddingHorizontal: size === 'sm' ? theme.spacing.sm : theme.spacing.md,
          paddingVertical: size === 'sm' ? theme.spacing.xs : theme.spacing.sm,
        },
      ]}
    >
      <Text size={size === 'sm' ? 'xs' : 'sm'} tone={tone} weight="bold">
        {children}
      </Text>
    </View>
  );
}

export const Tag = Badge;

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
});
