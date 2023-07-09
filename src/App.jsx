import { useLayoutEffect, useState } from 'react';
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

    useLayoutEffect(
        () => {
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const aboveGameElement = document.getElementById('above-game');
            const aboveGameElementHeight = aboveGameElement.offsetHeight;
            const gameBoardElement = document.getElementById('game-board');
            gameBoardElement.style.height = `${Math.floor(viewportHeight - aboveGameElementHeight)}px`;
            const rowHeight = Math.floor((viewportHeight - aboveGameElementHeight)/size) - 25;
            const cellWidth = Math.floor(viewportWidth/size) - 25;
            const cardDimension = cellWidth < rowHeight ? cellWidth : rowHeight;
            for (let i = 0; i < size; i += 1) {
                const rowElement = document.getElementById(`game-row-${i}`);
                rowElement.style.height = `${rowHeight}px`;
            }
            for (let i = 0; i < size * size; i += 1) {
                const cardElement = document.getElementById(`card-${i}`);
                cardElement.style.width = `${cardDimension}px`;
                cardElement.style.height = `${cardDimension}px`;
            }
        }
    );

    return (
        <div id="app-container" className="app-container">
            <div id='above-game' className="above-game">
                <div className="above-game-left">
                    <DropdownSingleItemSelector
                        items='"Fairies", "Super Heroes", "Humanity in Space", "People with Dogs"'
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
                        items='"4 x 4", "6 x 6", "8 x 8", "10 x 10"'
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
