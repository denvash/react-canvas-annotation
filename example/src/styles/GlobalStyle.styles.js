import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%);
    background-blend-mode: multiply;
  }
  main {
    ${tw`h-screen w-screen text-white`}
  }
  h1 {
    ${tw`text-2xl text-center`}
  }
`;

export default GlobalStyle;
