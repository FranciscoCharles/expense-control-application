import styled,{createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}
html{
  font-size: 10px;
}
body {
  font-size: 1.6rem;
  min-height: 100vh;
  min-width: 100vw;
  font-family: Arial, Helvetica, sans-serif;
  display:block;
}
main{
  position: relative;
  min-width: 100%;
  min-height: 100%;
}
`;
const StyledMain = styled.main`
main{
  position: relative;
  min-width: 100%;
  min-height: 100%;
}
`;
export { GlobalStyle, StyledMain };