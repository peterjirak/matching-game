import { useLayoutEffect, useState } from 'react';
import { dynamicallySizeGameElements, dynamicallySizeLargeImageViewer } from './js/dynamicResizeUtilities';
import LargeImageViewer from './LargeImageViewer';
import AboveGame from './AboveGame';
import Game from './Game';
import ConfigureGame from './ConfigureGame';
import './App.css';

const collections = [
    'Fairies',
    'Super Heroes',
    'Humanity in Space',
    'People with Cats',
    'People with Dogs',
    'A Spring Celebration'
];

const sampleCards = {
    'Fairies': 90,
    'Super Heroes': 33,
    'Humanity in Space': 9,
    'People with Cats': 7,
    'People with Dogs': 20,
    'A Spring Celebration': 25
};

const cardCounts = {
    'Fairies': 90,
    'Humanity in Space': 61,
    'People with Cats': 98,
    'People with Dogs': 63,
    'Super Heroes': 65,
    'A Spring Celebration': 103
};

const maxSizeByCollection = {
    'Fairies': 12,
    'Humanity in Space': 10,
    'People with Cats': 12,
    'People with Dogs': 10,
    'Super Heroes': 10,
    'A Spring Celebration': 12
};

const collectionDimensions = {
    'A Spring Celebration': '"4 x 4", "6 x 6", "8 x 8", "10 x 10", "12 x 12"',
    'Fairies': '"4 x 4", "6 x 6", "8 x 8", "10 x 10", "12 x 12"',
    'Humanity in Space': '"4 x 4", "6 x 6", "8 x 8", "10 x 10"',
    'People with Cats': '"4 x 4", "6 x 6", "8 x 8", "10 x 10", "12 x 12"',
    'People with Dogs': '"4 x 4", "6 x 6", "8 x 8", "10 x 10"',
    'Super Heroes': '"4 x 4", "6 x 6", "8 x 8", "10 x 10"'
}

const App = () => {
    const [dimensionSelectorOpen, setDimensionSelectorOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(4);
    const [collectionSelectorOpen, setCollectionSelectorOpen] = useState(false);
    const [collection, setCollection] = useState('Fairies');
    const [imageIdsForCards, setImageIdsForCards] = useState(null);
    const [cardsFaceUp, setCardsFaceUp] = useState(null);
    const [matchedCards, setMatchedCards] = useState(null);
    const [cardFlipCounts, setCardFlipCounts] = useState(null);
    const [gameScore, setGameScore] = useState(0);
    const [activeCards, setActiveCards] = useState([]);
    const [viewLargeImageId, setIdOfLargeImageToView] = useState(null);
    const [timerDisplayed, setTimerDisplayed] = useState(false);
    const [gameStartEpochTime, setGameStartEpochTime] = useState(null);
    const [currentEpochTime, setCurrentEpochTime] = useState(null);
    const [timerId, setTimerId] = useState(null);

    // gameStates are:
    //     * 'Not Started'
    //     * 'Select Collection'
    //     * 'Select Dimension'
    //     * 'In-Progress'
    const [gameState, setGameState]  = useState('Not Started');

    let cardsMatched = 0;
    if (matchedCards) {
        for (const imageId of matchedCards) {
            cardsMatched += imageId ? 1 : 0;
        }
    }

    useLayoutEffect(
        () => {
            dynamicallySizeGameElements();
            dynamicallySizeLargeImageViewer();
        }
    );

    const setUpCards = () => {
        if (!imageIdsForCards) {
            let imageIds = Array.from({length: cardCounts[collection]}, (_, i) => i + 1);
            let cardIds = Array.from({length: selectedSize * selectedSize}, (_, i) => i);
            const setupImageIdsForCards = new Array(selectedSize * selectedSize).fill(null);
            for (let i = 0; i < selectedSize * selectedSize / 2; i += 1) {
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
        }
    }

    const setToSelectCollection = () => {
        setGameState('Select Collection');
    }

    const setToSelectSize = () => {
        setGameState('Select Size')
    }

    const startGame = () => {
        setGameState('In-Progress');
        setUpCards();
        setGameStartEpochTime(Date.now());
        const idOfTimer = setInterval(
            () => {
                setCurrentEpochTime(Date.now());
            },
            1000
        );
        setTimerId(idOfTimer);
    }

    const configureGameElement = gameState === 'Not Started' || gameState === 'Select Collection' || gameState === 'Select Size' ?
                                 <ConfigureGame
                                     gameState={gameState}
                                     setToSelectCollection={setToSelectCollection}
                                     setToSelectSize={setToSelectSize}
                                     collections={collections}
                                     collection={collection}
                                     setCollection={setCollection}
                                     sampleCards={sampleCards}
                                     maxSizeByCollection={maxSizeByCollection}
                                     selectedSize={selectedSize}
                                     setSelectedSize={setSelectedSize}
                                     startGame={startGame}
                                     timerDisplayed={timerDisplayed}
                                     setTimerDisplayed={setTimerDisplayed}
                                 />
                                 : null;

    return (
        <div id="app-container" className="app-container">
            {configureGameElement}
            <LargeImageViewer
                imageId={viewLargeImageId}
                collection={collection}
                setIdOfLargeImageToView={setIdOfLargeImageToView}
            />
            <AboveGame
                gameState={gameState}
                collection={collection}
                setCollection={setCollection}
                collectionDimensions={collectionDimensions}
                gameScore={gameScore}
                matchedCards={matchedCards}
                gameStartEpochTime={gameStartEpochTime}
                currentEpochTime={currentEpochTime}
                timerDisplayed={timerDisplayed}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                dimensionSelectorOpen={dimensionSelectorOpen}
                setDimensionSelectorOpen={setDimensionSelectorOpen}
                collectionSelectorOpen={collectionSelectorOpen}
                setCollectionSelectorOpen={setCollectionSelectorOpen}
            />
            <Game
                size={selectedSize}
                cardCollection={collection}
                setUpCards={setUpCards}
                imageIdsForCards={imageIdsForCards}
                cardsFaceUp={cardsFaceUp}
                setCardsFaceUp={setCardsFaceUp}
                matchedCards={matchedCards}
                setMatchedCards={setMatchedCards}
                cardFlipCounts={cardFlipCounts}
                setCardFlipCounts={setCardFlipCounts}
                gameScore={gameScore}
                setGameScore={setGameScore}
                activeCards={activeCards}
                setActiveCards={setActiveCards}
                setIdOfLargeImageToView={setIdOfLargeImageToView}
                gameState={gameState}
                setGameState={setGameState}
                timerId={timerId}
                setTimerId={setTimerId}
            />
        </div>
    )
}

export default App
