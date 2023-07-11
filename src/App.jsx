import { useLayoutEffect, useState } from 'react';
import DropdownSingleItemSelector from './DropdownSingleItemSelector';
import Game from './Game';
import './App.css';

const cardCounts = {
    'Fairies': 80,
    'Humanity in Space': 61,
    'People with Cats': 98,
    'People with Dogs': 63,
    'Super Heroes': 65
};

const collectionDimensions = {
    'Fairies': '"4 x 4", "6 x 6", "8 x 8", "10 x 10", "12 x 12"',
    'Humanity in Space': '"4 x 4", "6 x 6", "8 x 8", "10 x 10"',
    'People with Cats': '"4 x 4", "6 x 6", "8 x 8", "10 x 10", "12 x 12"',
    'People with Dogs': '"4 x 4", "6 x 6", "8 x 8", "10 x 10"',
    'Super Heroes': '"4 x 4", "6 x 6", "8 x 8", "10 x 10"'
}

const LargeImageViewer = (props) => {
    const imageId = props.imageId;
    const collection = props.collection;
    const setIdOfLargeImageToView = props.setIdOfLargeImageToView;

    if (!imageId) {
        return null;
    }

    let collectionId = collection;
    collectionId = collectionId.trim();
    collectionId = collectionId.toLowerCase();
    collectionId = collectionId.replace(/ /g, '-');

    const src = `/src/images/match-collections/${collectionId}/${collectionId}-id-${imageId}.png`;

    const onClick = () => {
        setIdOfLargeImageToView(null);
    }

    return (
        <div className='large-image-viewer-container'>
            <img className='large-image' src={src} onClick={onClick}></img>
        </div>
    );
}

const App = () => {
    const [dimensionSelectorOpen, setDimensionSelectorOpen] = useState(false);
    const [selectedDimension, setSelectedDimension] = useState('4 x 4');
    const [collectionSelectorOpen, setCollectionSelectorOpen] = useState(false);
    const [collection, setCollection] = useState('Fairies');
    const [imageIdsForCards, setImageIdsForCards] = useState(null);
    const [cardsFaceUp, setCardsFaceUp] = useState(null);
    const [matchedCards, setMatchedCards] = useState(null);
    const [activeCards, setActiveCards] = useState([]);
    const [viewLargeImageId, setIdOfLargeImageToView] = useState(null);

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

    useLayoutEffect(
        () => {
            const dimensions = collectionDimensions[collection];
            if (!dimensions.includes(selectedDimension)) {
                let dimensionsStr = dimensions;
                dimensionsStr = dimensionsStr.trim();
                dimensionsStr = dimensionsStr.replace(/^\s*"\s*/, '');
                dimensionsStr = dimensionsStr.replace(/\s*"\s*$/, '');
                const dimensionsForCollection = dimensionsStr.split(/\s*"\s*,\s*"\s*/);
                const useDimension = dimensionsForCollection[ -1 + dimensionsForCollection.length];
                setSelectedDimension(useDimension);
            }
        }
    );

    const setUpCards = () => {
        if (!imageIdsForCards) {
            let imageIds = Array.from({length: cardCounts[collection]}, (_, i) => i + 1);
            let cardIds = Array.from({length: size * size}, (_, i) => i);
            const setupImageIdsForCards = new Array(size * size).fill(null);
            for (let i = 0; i < size * size / 2; i += 1) {
                let card1 = null;
                let card2 = null;
                if (cardIds.length === 2) {
                    card1 = cardIds[0];
                    card2 = cardIds[1];
                    cardIds = [];
                } else {
                    let cardIdIndex1 = Math.floor(Math.random() * cardIds.length);
                    card1 = cardIds[cardIdIndex1];
                    cardIds.splice(cardIdIndex1, 1);
                    let cardIdIndex2 = Math.floor(Math.random() * cardIds.length);
                    card2 = cardIds[cardIdIndex2];
                    cardIds.splice(cardIdIndex2, 1);
                }
                let imageId = null;
                if (imageIds.length === 1) {
                    imageId = imageIds[0];
                    imageIds = [];
                } else {
                    let imageIdIndex = Math.floor(Math.random() * imageIds.length);
                    imageId = imageIds[imageIdIndex];
                    imageIds.splice(imageIdIndex, 1);
                }
                setupImageIdsForCards[card1] = imageId;
                setupImageIdsForCards[card2] = imageId;
            }
            setImageIdsForCards(setupImageIdsForCards);

            let faceUpCards = new Array(size * size).fill(false);
            setCardsFaceUp(faceUpCards);
            if (!matchedCards) {
                let cardsMatched = new Array(size * size).fill(null);
                setMatchedCards(cardsMatched);
            }
        }
    }

    return (
        <div id="app-container" className="app-container">
            <LargeImageViewer
                imageId={viewLargeImageId}
                collection={collection}
                setIdOfLargeImageToView={setIdOfLargeImageToView}
            />
            <div id='above-game' className="above-game">
                <div className="above-game-left">
                    <DropdownSingleItemSelector
                        items='"Fairies", "Super Heroes", "Humanity in Space", "People with Cats", "People with Dogs"'
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
                        items={collectionDimensions[collection]}
                        selected={selectedDimension}
                        setSelected={setSelectedDimension}
                        isOpen={dimensionSelectorOpen}
                        setToOpen={setDimensionSelectorOpen}
                />
                </div>
            </div>
            <Game
                size={size}
                cardCollection={collection}
                setUpCards={setUpCards}
                imageIdsForCards={imageIdsForCards}
                cardsFaceUp={cardsFaceUp}
                setCardsFaceUp={setCardsFaceUp}
                matchedCards={matchedCards}
                setMatchedCards={setMatchedCards}
                activeCards={activeCards}
                setActiveCards={setActiveCards}
                setIdOfLargeImageToView={setIdOfLargeImageToView}
            />
        </div>
    )
}

export default App
