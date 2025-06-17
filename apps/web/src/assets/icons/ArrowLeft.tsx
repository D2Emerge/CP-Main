export const ArrowLeft = ({width = 24, height = 24, className = ''}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      className={className}>
      <path
        fill="#000"
        fillRule="evenodd"
        d="M15.707 5.293a1 1 0 0 1 0 1.414L10.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
