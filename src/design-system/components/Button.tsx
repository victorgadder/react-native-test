import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text as NativeText,
  View,
} from 'react-native';

import { useTheme } from '../theme';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<PressableProps, 'style' | 'children' | 'disabled'> & {
  children: string;
  disabled?: boolean;
  loading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

const heightBySize = {
  sm: 36,
  md: 44,
  lg: 52,
} as const;

const fontSizeBySize = {
  sm: 14,
  md: 16,
  lg: 18,
} as const;

export function Button({
  children,
  disabled = false,
  loading = false,
  size = 'md',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  const isDisabled = disabled || loading;
  const isPrimary = variant === 'primary';
  const foregroundColor = isPrimary ? theme.colors.surface : theme.colors.primary;

  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: isPrimary ? theme.colors.primary : 'transparent',
          borderColor: variant === 'ghost' ? 'transparent' : theme.colors.primary,
          borderRadius: theme.radius.md,
          height: heightBySize[size],
          opacity: isDisabled ? 0.48 : pressed ? 0.78 : 1,
          paddingHorizontal: size === 'sm' ? theme.spacing.md : theme.spacing.lg,
        },
      ]}
    >
      <View style={styles.content}>
        {loading ? <ActivityIndicator color={foregroundColor} size="small" /> : null}
        <NativeText
          style={[
            styles.label,
            {
              color: foregroundColor,
              fontSize: fontSizeBySize[size],
            },
          ]}
        >
          {children}
        </NativeText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    justifyContent: 'center',
    minWidth: 96,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  label: {
    fontWeight: '700',
    letterSpacing: 0,
  },
});
