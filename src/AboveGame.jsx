import DropdownSingleItemSelector from './DropdownSingleItemSelector';


const AboveGameNotStarted = (props) => {
    const collection = props.collection;
    const setCollection = props.setCollection;
    const collectionDimensions = props.collectionDimensions;
    const selectedSize = props.selectedSize;
    const setSelectedSize = props.setSelectedSize;
    const dimensionSelectorOpen = props.dimensionSelectorOpen;
    const setDimensionSelectorOpen = props.setDimensionSelectorOpen;
    const collectionSelectorOpen = props.collectionSelectorOpen;
    const setCollectionSelectorOpen = props.setCollectionSelectorOpen; 

    return (
        <div id='above-game' className="above-game">
            <div className="above-game-left">
            </div>
            <div className="above-game-middle">
                <p className="game-title">&nbsp;</p>
            </div>
            <div className="above-game-right">
            </div>
        </div>
    );
}

const GameScore = (props) => {
    const gameScore = props.gameScore;

    return (
        <div className='score-attribute-with-label'>
            <div className='score-attribute-container'>
                <p className='score-completed-text'>{gameScore}</p>
            </div>
            <p className='score-completed-label-text'>Score</p>
        </div>
    );
}

const PercentageCompleted = (props) => {
    const matchedCards = props.matchedCards;

    let percentCompleted = 0;

    if (matchedCards && matchedCards.length > 0) {
        let matchedCardsCount = 0;
        for (const matchedItem of matchedCards) {
            matchedCardsCount += matchedItem ? 1 : 0;
        }
        percentCompleted = Math.floor(matchedCardsCount / matchedCards.length * 100);
    }

    return (
        <div className='percent-completed-attribute-with-label'>
            <div className='percent-attribute-container'>
                <p className='percentage-completed-text'>{percentCompleted} %</p>
            </div>
            <p className='percentage-completed-label-text'>Percent Completed</p>
        </div>
    );
}

const AboveGameInProgress = (props) => {
    const gameScore = props.gameScore;
    const matchedCards = props.matchedCards;
    const selectedSize = props.selectedSize;
    const gameStartEpochTime = props.gameStartEpochTime;
    const currentEpochTime = props.currentEpochTime;
    const timerDisplayed = props.timerDisplayed;

    return (
        <div id='above-game' className="above-game">
            <PercentageCompleted
                matchedCards={matchedCards}
            />
            <GameScore
                gameScore={gameScore}
            />
        </div>
    );
}

const AboveGame = (props) => {
    const gameState = props.gameState;
    const collection = props.collection;
    const setCollection = props.setCollection;
    const collectionDimensions = props.collectionDimensions;
    const gameScore = props.gameScore;
    const matchedCards = props.matchedCards;
    const gameStartEpochTime = props.gameStartEpochTime;
    const currentEpochTime = props.currentEpochTime;
    const timerDisplayed = props.timerDisplayed;
    const selectedSize = props.selectedSize;
    const setSelectedSize = props.setSelectedSize;
    const dimensionSelectorOpen = props.dimensionSelectorOpen;
    const setDimensionSelectorOpen = props.setDimensionSelectorOpen;
    const collectionSelectorOpen = props.collectionSelectorOpen;
    const setCollectionSelectorOpen = props.setCollectionSelectorOpen;

    if (gameState !== 'In-Progress' && gameState !== 'Completed') {
        return (
            <AboveGameNotStarted
                collection={collection}
                setCollection={setCollection}
                collectionDimensions={collectionDimensions}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                dimensionSelectorOpen={dimensionSelectorOpen}
                setDimensionSelectorOpen={setDimensionSelectorOpen}
                collectionSelectorOpen={collectionSelectorOpen}
                setCollectionSelectorOpen={setCollectionSelectorOpen}

            />
        );
    } else {
        return (
            <AboveGameInProgress
                gameScore={gameScore}
                matchedCards={matchedCards}
                selectedSize={selectedSize}
                gameStartEpochTime={gameStartEpochTime}
                currentEpochTime={currentEpochTime}
                timerDisplayed={timerDisplayed}
            />
        );
    }
}

export default AboveGame;
