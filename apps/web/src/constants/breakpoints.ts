export const breakpoints = {
  xs: 0,
  sm: 700,
  md: 820,
  lg: 1024,
  xl: 1280,
} as const;

export const tailwindBreakpoints = Object.fromEntries(
  Object.entries(breakpoints).map(([key, value]) => [key, `${value}px`])
);
