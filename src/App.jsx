import { useState } from 'react'
import './App.css'
import Home from './web/home';
import Board from './web/Board';
import './styles/home.css'
import "./styles/Button.css"
import "./styles/Board.css"
import "./styles/Card.css"
import "./styles/credits.css"

function App() {
  const [play, setPlay] = useState(false);
  function playBtnHandler() {
    setPlay(true);
  }

  return (
    <>
      {!play &&
        <Home
          playBtnHandler={playBtnHandler}
        />
      }
      {play &&
        <Board
        
        />
      }
    </>
  )
}

export default App
