import { radius, sizes, spacing } from '../tokens';
import type { AppTheme } from './types';

export const lightTheme = {
  mode: 'light',
  colors: {
    primary: '#0969da',
    background: '#f6f8fa',
    surface: '#ffffff',
    text: '#24292f',
    muted: '#57606a',
    border: '#d0d7de',
    success: '#1a7f37',
    warning: '#9a6700',
    danger: '#cf222e',
  },
  spacing,
  sizes,
  radius,
} satisfies AppTheme;

export const darkTheme = {
  mode: 'dark',
  colors: {
    primary: '#8ab4ff',
    background: '#0d1117',
    surface: '#161b22',
    text: '#f0f6fc',
    muted: '#8b949e',
    border: '#30363d',
    success: '#3fb950',
    warning: '#d29922',
    danger: '#f85149',
  },
  spacing,
  sizes,
  radius,
} satisfies AppTheme;
