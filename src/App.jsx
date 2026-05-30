import styled, { createGlobalStyle } from 'styled-components';
import Weather from './Weather.jsx';

// 1. Globala stilar för hela applikationen (ersätter body-styling i CSS)
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f0f4f8;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
`;

// 2. Styled component för själva App-containern
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Weather />
      </AppContainer>
    </>
  );
}

export default App;
