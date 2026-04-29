import { Text as NativeText, TextProps as NativeTextProps, StyleSheet } from 'react-native';

import { ColorToken, useTheme } from '../theme';
import { SizeToken } from '../tokens';

type TextVariant = 'body' | 'caption' | 'label';
type TextWeight = 'regular' | 'medium' | 'bold';

export type TextProps = Omit<NativeTextProps, 'style'> & {
  children: React.ReactNode;
  size?: SizeToken;
  tone?: ColorToken;
  variant?: TextVariant;
  weight?: TextWeight;
};

const fontWeightByWeight = {
  regular: '400',
  medium: '600',
  bold: '700',
} as const;

export function Text({
  children,
  size = 'md',
  tone = 'text',
  variant = 'body',
  weight = 'regular',
  ...props
}: TextProps) {
  const { theme } = useTheme();

  return (
    <NativeText
      {...props}
      style={[
        styles.base,
        {
          color: theme.colors[tone],
          fontSize: theme.sizes[size],
          fontWeight: fontWeightByWeight[weight],
          lineHeight: Math.round(theme.sizes[size] * 1.45),
        },
        variant === 'caption' && styles.caption,
        variant === 'label' && styles.label,
      ]}
    >
      {children}
    </NativeText>
  );
}

const styles = StyleSheet.create({
  base: {
    letterSpacing: 0,
  },
  caption: {
    textTransform: 'none',
  },
  label: {
    textTransform: 'uppercase',
  },
});
