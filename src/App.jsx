import { useState } from 'react'
import DropdownSingleItemSelector from './DropdownSingleItemSelector'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div id="app-container" className="app-container">
                <div className="above-game">
                   <div className="above-game-left">
                       <DropdownSingleItemSelector />
                   </div>
                   <div className="above-game-middle">
                       <p className="game-title">The Match Game</p>
                   </div>
                   <div className="above-game-right">
                       &nbsp;
                   </div>
                </div>
                <div className="game-board">
                    <div className="container-1">
                    </div>
                    <div className="container-2">
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
