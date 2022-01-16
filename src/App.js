import GameContainer from './container/GameContainer'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const Container = styled.section`
  background-color: #7C99AC;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

function App() {
  return (
    <Container className="App">
      <GlobalStyle/>
      <GameContainer />
    </Container>
  )
}

export default App
