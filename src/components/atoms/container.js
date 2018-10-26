import styled from 'styled-components';
import { space } from 'styled-system';

import theme from 'src/constants/theme';

export const Container = styled.div`
  padding-left: ${theme.space[3] / 2}px;
  padding-right: ${theme.space[3] / 2}px;
  ${space};
  margin-left: auto;
  margin-right: auto;
  max-width: ${theme.containerWidth};
  width: 100%;
  position: relative;
`;
