import DropdownSingleItemSelector from './DropdownSingleItemSelector';


const AboveGameNotStarted = (props) => {
    const collection = props.collection;
    const setCollection = props.setCollection;
    const selectedSize = props.selectedSize;
    const setSelectedSize = props.setSelectedSize;
    const dimensionSelectorOpen = props.dimensionSelectorOpen;
    const setDimensionSelectorOpen = props.setDimensionSelectorOpen;
    const collectionSelectorOpen = props.collectionSelectorOpen;
    const setCollectionSelectorOpen = props.setCollectionSelectorOpen; 

    return (
        <div key='above-game'
             id='above-game'
             className="above-game one-hundred-view-width"
        >
            <div key='above-game-left'
                 id='above-game-left'
                 className="above-game-left"
            >
            </div>
            <div key='above-game-middle'
                 className="above-game-middle"
            >
                <p key="game-title"
                   className="game-title"
                >
                    &nbsp;
                </p>
            </div>
            <div key='above-game-right'
                 className="above-game-right"
            >
            </div>
        </div>
    );
}



const ElapsedTime = (props) => {
    let elapsedMilliseconds = props.elapsedMilliseconds;
    let elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    let elapsedMinutes = Math.floor( elapsedSeconds / 60 );
    elapsedSeconds = elapsedSeconds % 60;

    if (elapsedSeconds < 10) {
        elapsedSeconds = `0${elapsedSeconds}`;
    }

    if (elapsedMinutes < 10) {
        elapsedMinutes = `0${elapsedMinutes}`;
    }

    return (
        <div id='elapsed-time-attribute-with-label'
             key='elapsed-time-attribute-with-label'
             className='elapsed-time-attribute-with-label'
        >
            <div id='elapsed-time-attribute-container'
                 key='elapsed-time-attribute-container'
                 className='elapsed-time-attribute-container'>
                <p id='elapsed-time-completed-text'
                   key='elapsed-time-completed-text'
                   className='elapsed-time-completed-text'>
                    {elapsedMinutes}:{elapsedSeconds}
                </p>
            </div>
            <div id='elapsed-time-completed-label-text-container'
                 className='elapsed-time-completed-label-text-container'
                 key='elapsed-time-completed-label-text-container'>
                <p id='elapsed-time-completed-label-text'
                key='elapsed-time-completed-label-text'
                className='elapsed-time-completed-label-text'>
                    Time
                </p>
            </div>
        </div>
    );
}

const GameScore = (props) => {
    const gameScore = props.gameScore;

    return (
        <div id='score-attribute-with-label'
             key='score-attribute-with-label'
             className='score-attribute-with-label'
        >
            <div id='score-attribute-container'
                 key='score-attribute-container'
                 className='score-attribute-container'
            >
                <p id='score-completed-text'
                   key='score-completed-text'
                   className='score-completed-text'
                >
                    {gameScore}
                </p>
            </div>
            <div id='score-label-text-container'
                 className='score-label-text-container'
                 key='score-label-text-container'>
                <p id='score-completed-label-text'
                key='score-completed-label-text'
                className='score-completed-label-text'>
                    Score
                </p>
            </div>
        </div>
    );
}

const FlipCount = (props) => {
    const cardFlipCounts = props.cardFlipCounts;

    let flipCount = 0;

    if (cardFlipCounts) {
        for (const count of cardFlipCounts) {
            if (!count) {
                continue;
            }
            flipCount += count;
        }
    }

    return (
        <div key='flip-count-attribute-with-label'
             className='flip-count-attribute-with-label'
        >
            <div key='flip-count-attribute-container'
                 className='flip-count-attribute-container'
            >
                <p key='flip-count-completed-text'
                   className='flip-count-completed-text'>
                    {flipCount}
                </p>
            </div>
            <div key='flips-completed-label-container'
                 id='flips-completed-label-container'
                 className='flip-count-label-container'
            >
                <p key='flip-count-completed-label-text'
                className='flip-count-completed-label-text'
                >
                    Flips
                </p>
            </div>
        </div>
    );
}

const ExtraFlipCount = (props) => {
    const cardFlipCounts = props.cardFlipCounts;

    let extraFlipCount = 0;

    if (cardFlipCounts) {
        for (const count of cardFlipCounts) {
            if (!count) {
                continue;
            } else if (count > 2) {
                extraFlipCount += count - 2;
            }
        }
    }

    return (
        <div key='extra-flip-count-attribute-with-label'
             className='flip-count-attribute-with-label'
        >
            <div key='extra-flip-count-attribute-container'
                 className='flip-count-attribute-container'
            >
                <p key='extra-flip-count-completed-text'
                   className='flip-count-completed-text'>
                    {extraFlipCount}
                </p>
            </div>
            <div key='extra-flips-completed-label-container'
                 id='extra-flips-completed-label-container'
                 className='flip-count-label-container'
            >
                <p key='extra-flip-count-completed-label-text'
                   className='flip-count-completed-label-text'
                >
                    Extra Flips
                </p>
            </div>
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
        <div id='percent-completed-attribute-with-label'
             key='percent-completed-attribute-with-label'
             className='percent-completed-attribute-with-label'
        >
            <div key='percent-attribute-container'
                 className='percent-attribute-container'
            >
                <p key='percentage-completed-text'
                   className='percentage-completed-text'>
                    {percentCompleted} %
                </p>
            </div>
            <div id='percentage-completed-label-container'
                 key='percentage-completed-label-container'
                 className='percentage-completed-label-container'>
                <p key='percentage-completed-label-text'
                className='percentage-completed-label-text'>
                    Completed
                </p>
            </div>
        </div>
    );
}

const AboveGameInProgress = (props) => {
    const cardFlipCounts = props.cardFlipCounts;
    const gameScore = props.gameScore;
    const matchedCards = props.matchedCards;
    const selectedSize = props.selectedSize;
    const gameStartEpochTime = props.gameStartEpochTime;
    const currentEpochTime = props.currentEpochTime;
    const timerDisplayed = props.timerDisplayed;


    const scoreItems = [
        <PercentageCompleted
            matchedCards={matchedCards}
        />,
        <FlipCount
            cardFlipCounts={cardFlipCounts}
        />,
        <ExtraFlipCount
            cardFlipCounts={cardFlipCounts}
        />,
        <GameScore
            gameScore={gameScore}
        />
    ];

    if (timerDisplayed) {
        scoreItems.push(
            <ElapsedTime
                elapsedMilliseconds={currentEpochTime && gameStartEpochTime ? currentEpochTime - gameStartEpochTime : 0}
            />
        );
    }

    return (
        <div key='above-game' id='above-game' className="above-game">
            
            <div key='score-elements' id='score-elements-collection' className='score-elements-collection'>
                {scoreItems}
            </div>
        </div>
    );
}

const AboveGame = (props) => {
    const gameState = props.gameState;
    const collection = props.collection;
    const setCollection = props.setCollection;
    const cardFlipCounts = props.cardFlipCounts;
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
                cardFlipCounts={cardFlipCounts}
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
