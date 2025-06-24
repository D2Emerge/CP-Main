export const screenshotStyle = {
  'pre[class*="language-"]': {
    color: '#000000',
    background: '#EBEBEB',
    fontSize: '14px',
    padding: '5px',
    borderRadius: '12px',
    margin: '1em 0',
    overflow: 'auto',
    paddingLeft: '30px',
  },
  comment: {
    color: '#6a737d',
    fontStyle: 'italic',
  },
  property: {
    color: '#28a745', // Green
  },
  string: {
    color: '#28a745', // Green
  },
  number: {
    color: '#d19a66', // Brownish-orange
  },
  'attr-value': {
    // For values like hex codes in CSS
    color: '#d19a66',
  },
  keyword: {
    // For `white` in `color: white;`
    color: '#000000',
  },
  selector: {
    // For `pre` in `pre { ... }`
    color: '#000000',
  },
  punctuation: {
    color: '#000000',
  },
  operator: {
    color: '#000000',
  },
  function: {
    color: '#000000',
  },
};
