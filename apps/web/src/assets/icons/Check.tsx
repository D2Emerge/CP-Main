import React from 'react';

export const Check = ({
  width = 24,
  height = 24,
  color = 'currentColor',
}: {
  width?: number;
  height?: number;
  color?: string;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 14 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 5L4.99529 9L13 1"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
