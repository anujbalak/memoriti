import { useState } from 'react'
import './App.css'
import Home from './web/home';
import Board from './web/Board';
import './styles/home.css'
import "./styles/Button.css"

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
