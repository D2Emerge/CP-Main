import {breakpoints} from '@src/constants/breakpoints';

type BreakpointKey = keyof typeof breakpoints;
export const isLowerOrEqualThan = (
  currentBreakpoint: BreakpointKey,
  limitBreakpoint: BreakpointKey
) => {
  const keys = Object.keys(breakpoints);
  const currentBreakpointIndex = keys.indexOf(currentBreakpoint);
  const limitBreakpointIndex = keys.indexOf(limitBreakpoint);
  return currentBreakpointIndex <= limitBreakpointIndex;
};
