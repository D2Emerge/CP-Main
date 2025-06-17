export const MessageSquare = ({width = 16, height = 16, className = ''}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M13 9.66667C13 9.96135 12.8829 10.244 12.6746 10.4523C12.4662 10.6607 12.1836 10.7778 11.8889 10.7778H5.22222L3 13V4.11111C3 3.81643 3.11706 3.53381 3.32544 3.32544C3.53381 3.11706 3.81643 3 4.11111 3H11.8889C12.1836 3 12.4662 3.11706 12.6746 3.32544C12.8829 3.53381 13 3.81643 13 4.11111V9.66667Z"
        stroke="#7B7875"
        stroke-width="0.833333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
