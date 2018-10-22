import styled from 'styled-components';
import { alignItems, justifyContent, flexWrap } from 'styled-system';

import { Box } from '../atoms';

export const Flex = styled(Box)`
  display: flex;
  ${alignItems};
  ${justifyContent};
  ${flexWrap};
`;

Flex.displayName = 'Flex';

Flex.defaultProps = {
  px: 0
};
