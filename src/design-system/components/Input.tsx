import { TextInput, TextInputProps, View, StyleSheet } from 'react-native';

import { useTheme } from '../theme';
import { Text } from './Text';

type InputSize = 'sm' | 'md' | 'lg';

export type InputProps = Omit<TextInputProps, 'style' | 'placeholderTextColor'> & {
  error?: string;
  helperText?: string;
  label?: string;
  size?: InputSize;
};

const heightBySize = {
  sm: 40,
  md: 48,
  lg: 56,
} as const;

const fontSizeBySize = {
  sm: 14,
  md: 16,
  lg: 18,
} as const;

export function Input({
  editable = true,
  error,
  helperText,
  label,
  size = 'md',
  ...props
}: InputProps) {
  const { theme } = useTheme();
  const hasError = Boolean(error);
  const supportText = error ?? helperText;

  return (
    <View style={styles.container}>
      {label ? (
        <Text size="sm" variant="label" weight="bold">
          {label}
        </Text>
      ) : null}
      <TextInput
        {...props}
        editable={editable}
        placeholderTextColor={theme.colors.muted}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            borderColor: hasError ? theme.colors.danger : theme.colors.border,
            borderRadius: theme.radius.md,
            color: theme.colors.text,
            fontSize: fontSizeBySize[size],
            height: heightBySize[size],
            opacity: editable ? 1 : 0.56,
            paddingHorizontal: theme.spacing.md,
          },
        ]}
      />
      {supportText ? (
        <Text size="sm" tone={hasError ? 'danger' : 'muted'}>
          {supportText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    letterSpacing: 0,
  },
});
