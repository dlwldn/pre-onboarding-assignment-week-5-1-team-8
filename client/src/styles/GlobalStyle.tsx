import { createGlobalStyle } from 'styled-components';
import color from './color';
import reset from './reset';

const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
    background: ${color.blue2};
  }
`;

export default GlobalStyle;
