
import { GlobalStyle, StyledMain } from './global';
import RoutePages from './routers';

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledMain>
        <RoutePages />
      </StyledMain>
    </>
  );
}

export default App;
