import { useState } from 'react'
import DropdownSingleItemSelector from './DropdownSingleItemSelector'
import './App.css'

function App() {
    const [count, setCount] = useState(0);
    const [dimensionSelectorOpen, setDimensionSelectorOpen] = useState(false);
    const [selectedDimension, setSelectedDimension] = useState('4 x 4');

    return (
        <>
            <div id="app-container" className="app-container">
                <div className="above-game">
                   <div className="above-game-left">
                       <DropdownSingleItemSelector
                           items='"4 x 4", "6 x 6", "8 x 8", "10 x 10"'
                           selected={selectedDimension}
                           setSelected={setSelectedDimension}
                           isOpen={dimensionSelectorOpen}
                           setToOpen={setDimensionSelectorOpen}
                       />
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
