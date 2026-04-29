export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const sizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 28,
} as const;

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
} as const;

export type SpacingToken = keyof typeof spacing;
export type SizeToken = keyof typeof sizes;
export type RadiusToken = keyof typeof radius;
