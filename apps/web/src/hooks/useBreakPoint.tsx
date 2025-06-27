import {useEffect, useState} from 'react';

import {breakpoints} from '@src/constants/breakpoints';

export const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState<keyof typeof breakpoints>('xs');
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    if (0 < windowSize.width && windowSize.width < breakpoints.sm) {
      setBreakPoint('xs');
    }
    if (
      breakpoints.sm < windowSize.width &&
      windowSize.width < breakpoints.md
    ) {
      setBreakPoint('sm');
    }
    if (
      breakpoints.md < windowSize.width &&
      windowSize.width < breakpoints.lg
    ) {
      setBreakPoint('md');
    }
    if (
      breakpoints.lg < windowSize.width &&
      windowSize.width < breakpoints.xl
    ) {
      setBreakPoint('lg');
    }
    if (windowSize.width >= breakpoints.xl) {
      setBreakPoint('xl');
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width]);
  return breakpoint;
};
