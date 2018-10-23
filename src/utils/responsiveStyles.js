import { propTypes } from 'styled-system';

// override styled-system removeProps with custom props
const blacklist = Object.keys(propTypes).reduce(
  (a, key) => [...a, ...Object.keys(propTypes[key])],
  ['textAlign', 'width'],
);

export const removeProps = props => {
  const next = {};

  for (let key in props) {
    if (blacklist.includes(key)) continue;
    next[key] = props[key];
  }

  return next;
};
