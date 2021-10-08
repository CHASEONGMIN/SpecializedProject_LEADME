// 전역으로 css를 적용시킬수있습니다.
import { createGlobalStyle } from "styled-components";
import './index.css';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: fontPrimary;
    line-height: 1.5;
    justify-content:center;
    background-color: #101010;
    color: white;
  }

  button{
    font-family: fontPrimary;
    background-color: #7D54BD;
    color: white;
  }

  h2 {
    font-family: fontSecond;
    font-size: 2rem;
    color: violet;
  }

  h3 {
    font-family: fontPrimary;
    font-size: 2rem;
  }
`;

export default GlobalStyle;

