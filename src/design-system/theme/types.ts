import type { radius, sizes, spacing } from '../tokens';

export type ColorToken =
  | 'primary'
  | 'background'
  | 'surface'
  | 'text'
  | 'muted'
  | 'border'
  | 'success'
  | 'warning'
  | 'danger';

export type ThemeMode = 'light' | 'dark';

export type ThemeColors = Record<ColorToken, string>;

export type AppTheme = {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: typeof spacing;
  sizes: typeof sizes;
  radius: typeof radius;
};
