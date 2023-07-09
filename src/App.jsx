import { useState } from 'react';
import DropdownSingleItemSelector from './DropdownSingleItemSelector';
import Game from './Game';
import './App.css';

function App() {
    const [dimensionSelectorOpen, setDimensionSelectorOpen] = useState(false);
    const [selectedDimension, setSelectedDimension] = useState('4 x 4');
    const [collectionSelectorOpen, setCollectionSelectorOpen] = useState(false);
    const [collection, setCollection] = useState('Fairies');

    const match = selectedDimension.match(/(\d+)/);
    if (!match) {
        throw TypeError(`Error: Defect encountered in App component. Size not detected from dimension selector.`);
    }
    const size = parseInt(match[1]);

    return (
        <div id="app-container" className="app-container">
            <div className="above-game">
                <div className="above-game-left">
                    <DropdownSingleItemSelector
                        items='"Fairies", "Super Heroes", "Humanity in Space"'
                        selected={collection}
                        setSelected={setCollection}
                        isOpen={collectionSelectorOpen}
                        setToOpen={setCollectionSelectorOpen}
                    />
                </div>
                <div className="above-game-middle">
                    <p className="game-title">The Match Game</p>
                </div>
                <div className="above-game-right">
                <DropdownSingleItemSelector
                        items='"4 x 4", "6 x 6", "8 x 8", "10 x 10", "12 x 12"'
                        selected={selectedDimension}
                        setSelected={setSelectedDimension}
                        isOpen={dimensionSelectorOpen}
                        setToOpen={setDimensionSelectorOpen}
                />
                </div>
            </div>
            <Game
                size={size}
            />
        </div>
    )
}

export default App
