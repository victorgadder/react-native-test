import { Image, StyleSheet, View } from 'react-native';

import { useTheme } from '../theme';
import { Text } from './Text';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = {
  name: string;
  size?: AvatarSize;
  sourceUri?: string;
};

const sizeByToken = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 72,
} as const;

const textSizeByToken = {
  sm: 'xs',
  md: 'sm',
  lg: 'lg',
  xl: 'xl',
} as const;

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function Avatar({ name, size = 'md', sourceUri }: AvatarProps) {
  const { theme } = useTheme();
  const dimension = sizeByToken[size];

  return (
    <View
      accessibilityLabel={name}
      style={[
        styles.avatar,
        {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.border,
          borderRadius: dimension / 2,
          height: dimension,
          width: dimension,
        },
      ]}
    >
      {sourceUri ? (
        <Image
          source={{ uri: sourceUri }}
          style={[
            styles.image,
            {
              borderRadius: dimension / 2,
              height: dimension,
              width: dimension,
            },
          ]}
        />
      ) : (
        <Text size={textSizeByToken[size]} tone="surface" weight="bold">
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
});
