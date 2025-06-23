export const ThreeDots = ({width = 24, height = 24, className = ''}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <circle cx="5.5" cy="12.5" r="2" fill="#7B7875" />
      <circle cx="12.5" cy="12.5" r="2" fill="#7B7875" />
      <circle cx="19.5" cy="12.5" r="2" fill="#7B7875" />
    </svg>
  );
};
