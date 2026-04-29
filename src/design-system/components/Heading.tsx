import { Text as NativeText, TextProps as NativeTextProps, StyleSheet } from 'react-native';

import { ColorToken, useTheme } from '../theme';
import { SizeToken } from '../tokens';

type HeadingLevel = 1 | 2 | 3;

export type HeadingProps = Omit<NativeTextProps, 'style'> & {
  children: React.ReactNode;
  level?: HeadingLevel;
  size?: Extract<SizeToken, 'md' | 'lg' | 'xl'>;
  tone?: ColorToken;
};

const sizeByLevel = {
  1: 'xl',
  2: 'lg',
  3: 'md',
} as const;

export function Heading({ children, level = 1, size, tone = 'text', ...props }: HeadingProps) {
  const { theme } = useTheme();
  const headingSize = size ?? sizeByLevel[level];

  return (
    <NativeText
      {...props}
      accessibilityRole="header"
      style={[
        styles.base,
        {
          color: theme.colors[tone],
          fontSize: theme.sizes[headingSize],
          lineHeight: Math.round(theme.sizes[headingSize] * 1.2),
        },
      ]}
    >
      {children}
    </NativeText>
  );
}

const styles = StyleSheet.create({
  base: {
    fontWeight: '800',
    letterSpacing: 0,
  },
});
