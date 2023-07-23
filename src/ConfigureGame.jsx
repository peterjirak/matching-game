import { getImgSrcPath } from "./js/gameUtilities";

const DisplayPlayGamePopup = (props) => {
    const setToSelectCollection = props.setToSelectCollection;

    return (
        <div key='game-configuration-body'
             id='game-configuration-body'
             className='display-play-game-popup-container'
        >
             <p key='play-game-title'
                className="play-game-title"
            >
                The Match Game
            </p>
             <button key='play-game-button'
                     type='button'
                     className='play-game-button-text pale-azure-color'
                     onClick={setToSelectCollection}
             >
                 Play Game
             </button>
        </div>
    );

} 

const ConfigureCollection = (props) => {
    const collections = props.collections;
    const collection = props.collection;
    const setCollection = props.setCollection;
    const sampleCards = props.sampleCards;
    const maxSizeByCollection = props.maxSizeByCollection;
    const setToSelectSize = props.setToSelectSize;
    const selectedSize = props.selectedSize;
    const setSelectedSize = props.setSelectedSize;

    const cardImgSrc = getImgSrcPath(collection, sampleCards[collection]);

    const collectionIndex = collections.indexOf(collection);

    if (collectionIndex < 0) {
        throw new RangeError(`The collection ${collection} is not in the list of collections.`);
    }

    const leftCollectionIndex = collectionIndex === 0 ? collections.length - 1 : collectionIndex - 1;
    const rightCollectionIndex = collectionIndex < collections.length - 1 ? collectionIndex + 1 : 0;
    const leftCollection = collections[leftCollectionIndex];
    const rightCollection = collections[rightCollectionIndex];

    const onLeftChevronButtonClick = () => {
        setCollection(leftCollection);
        if (!selectedSize) {
            setSelectedSize(4);
        } else if (selectedSize > maxSizeByCollection[leftCollection]) {
            setSelectedSize(maxSizeByCollection[leftCollection]);
        }
    }

    const onRightChevronButtonClick = () => {
        setCollection(rightCollection);
        if (!selectedSize) {
            setSelectedSize(4);
        } else if (selectedSize > maxSizeByCollection[leftCollection]) {
            setSelectedSize(maxSizeByCollection[leftCollection]);
        }
    }

    return (
        <div key='game-configuration-body'
             id='game-configuration-body'
             className='display-play-game-popup-container-choose-collection'
        >
            <div key='game-configuration-container'
                 className='game-configuration-container'
            >
                <p key='choose-configuration-attribute-prompt'
                   className='choose-configuration-attribute-prompt font-size-42px'
                >
                    Choose Collection
                </p>
                <div key='configure-attribute-selector-container'
                     className='configure-attribute-selector-container'
                >
                    <button key='configure-attribute-selector-button-left'
                            className='configure-attribute-selector-button'
                            onClick={onLeftChevronButtonClick}
                            type='button'
                    >
                        <img key='configure-collection-selector-chevron-left-img'
                             className='configure-collection-selector-chevron-right-img left-right-mirror-flip-img'
                             src='/src/images/application-controls/chevron-right.svg'
                        >
                        </img>
                    </button>
                    <p key='configure-attribute-title'
                       className="configure-attribute-title"
                    >
                        {collection}
                    </p>
                    <button key='configure-attribute-selector-button-right'
                            className='configure-attribute-selector-button'
                            onClick={onRightChevronButtonClick}
                            type='button'
                    >
                        <img ley='configure-collection-selector-chevron-right-img'
                             className='configure-collection-selector-chevron-right-img'
                             src='/src/images/application-controls/chevron-right.svg'
                        >
                        </img>
                    </button>
                </div>
                <img key='sample-card-img'
                     className='sample-card'
                     src={cardImgSrc}
                >
                </img>
                <button key='configure-attribute-selector-button-right'
                        type='button'
                        className='prev-next-button pale-azure-color'
                        onClick={setToSelectSize}
                >
                     <p key='next-button-text'
                        className='margin-left-20px prev-prev-next-button-text'
                    >
                        Next
                    </p>
                    <img key='next-button-chevron-right-img'
                         className='prev-next-button-chevron-right-img'
                         src='/src/images/application-controls/chevron-right-white.svg'
                    >
                    </img>
                </button>
            </div>
        </div>
    );
}

const ConfigureSize = (props) => {
    const collection = props.collection;
    const selectedSize = props.selectedSize;
    const maxSizeByCollection = props.maxSizeByCollection;
    const setSelectedSize = props.setSelectedSize;
    const setToSelectCollection = props.setToSelectCollection;
    const startGame = props.startGame;
    const timerDisplayed = props.timerDisplayed;
    const setTimerDisplayed = props.setTimerDisplayed;

    const decreaseSize = () => {
        setSelectedSize( selectedSize - 2 );
    }

    const increaseSelectedSize = () => {
        setSelectedSize( selectedSize + 2 );
    }

    const decreaseSizeControl = selectedSize <= 4 ?
                                    <div key='decrease-size-button'
                                         className='configure-attribute-selector-button'
                                    >
                                        <p key='decrease-size-button-minus-sign'
                                           className='size-button-text size-text-padding size-button-text-disabled'
                                        >
                                            -
                                        </p>
                                    </div> :
                                    <button key='decrease-size-button'
                                            className='configure-attribute-selector-button'
                                            type='button'
                                            onClick={decreaseSize}
                                    >
                                        <p key='decrease-size-button-minus-sign'
                                           className='size-button-text size-text-padding size-button-text-enabled'
                                        >
                                            -
                                        </p>
                                    </button>

    const increaseSizeControl = selectedSize < maxSizeByCollection[collection] ?
                                    <button key='increase-size-button'
                                            className='configure-attribute-selector-button'
                                            onClick={increaseSelectedSize}
                                    >
                                        <p key='increase-size-button-plus-sign'
                                           className='size-button-text size-button-text-enabled'
                                        >
                                            +
                                        </p>
                                    </button> :
                                    <div id='increase-size-button'
                                         className='configure-attribute-selector-button'
                                         type='button'
                                    >
                                        <p key='increase-size-button-plus-sign'
                                           className='size-button-text size-button-text-disabled'>
                                            +
                                        </p>
                                    </div>


    return (
        <div key='game-configuration-body'
             id='game-configuration-body'
             className='display-play-game-popup-container-choose-collection'
        >
            <div key='game-configuration-container'
                 className='game-configuration-container'
            >
                <p key='choose-board-size-text'
                   className='choose-configuration-attribute-prompt font-size-42px'
                >
                    Choose Size
                </p>
                <div key='configure-size-selector-container'
                     className='configure-attribute-selector-container'
                >
                    {decreaseSizeControl}
                    <p key='configure-size-selector-title'
                       className="configure-attribute-title"
                    >
                        {selectedSize} x {selectedSize}
                    </p>
                    {increaseSizeControl}
                </div>
                <div key='configure-game-settings-container'
                     className='sample-card'
                >
                    <p key='display-timer-title'
                       className='choose-configuration-attribute-prompt font-size-28px'
                    >
                        {timerDisplayed ? 'Timer Displayed' : 'No Timer'}
                    </p>
                    <button key='toggle-display-timer-button'
                            type='button'
                            className='toggle-button'
                            onClick={() => { timerDisplayed ? setTimerDisplayed(false) : setTimerDisplayed(true) }}
                    >
                        <img key='toggle-display-timer-img'
                             className='toggle-button-img'
                             src={timerDisplayed ? '/src/images/application-controls/toggle-enabled.svg' : '/src/images/application-controls/toggle-disabled.svg'}
                        >
                        </img>
                    </button>
                </div>
                <div key='prev-next-row-container'
                     className='button-row-container'
                >
                    <button key='prev-button'
                            type='button'
                            className='prev-next-button african-violet'
                            onClick={setToSelectCollection}
                    >
                        <img key='left-chevron-button-img'
                             className='prev-next-button-chevron-right-img left-right-mirror-flip-img'
                             src='/src/images/application-controls/chevron-right-white.svg'
                        >
                        </img>
                        <p key='prev-label-text'
                           className='prev-prev-next-button-text margin-right-20px'>
                            Prev
                        </p>
                    </button>
                    <div key='spacer-10px-by-10px'
                         className='spacer-10px-by-10px'>
                    </div>
                    <button key='start-game-button'
                            type='button'
                            className='prev-next-button pale-azure-color'
                            onClick={startGame}
                    >
                        <p
                           key='start-game-button-text'
                           className='prev-prev-next-button-text margin-left-20px'
                        >
                            Start
                        </p>
                        <img key='right-chevron-button-img'
                             className='prev-next-button-chevron-right-img'
                             src='/src/images/application-controls/chevron-right-white.svg'
                        >
                        </img>
                    </button>
                </div>
            </div>
        </div>
    );
}

const GameConfigurationBody = (props) => {
    const gameState = props.gameState;
    const setToSelectCollection = props.setToSelectCollection;
    const setToSelectSize = props.setToSelectSize;
    const collections = props.collections;
    const collection = props.collection;
    const setCollection = props.setCollection;
    const sampleCards = props.sampleCards;
    const maxSizeByCollection = props.maxSizeByCollection;
    const selectedSize = props.selectedSize;
    const setSelectedSize = props.setSelectedSize;
    const startGame = props.startGame;
    const timerDisplayed = props.timerDisplayed;
    const setTimerDisplayed = props.setTimerDisplayed;


    if (gameState === 'Not Started') {
        return (
            <DisplayPlayGamePopup
                setToSelectCollection={setToSelectCollection}
                collections={collections}
                collection={collection}
                setCollection={setCollection}
                sampleCards={sampleCards}
            />
        )
    } else if (gameState === 'Select Collection') {
        return (
            <ConfigureCollection
                collections={collections}
                collection={collection}
                setCollection={setCollection}
                sampleCards={sampleCards}
                maxSizeByCollection={maxSizeByCollection}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                setToSelectSize={setToSelectSize}
                timerDisplayed={timerDisplayed}
                setTimerDisplayed={setTimerDisplayed}
            />
        );
    } else {
        return (
            <ConfigureSize
                collection={collection}
                maxSizeByCollection={maxSizeByCollection}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                setToSelectCollection={setToSelectCollection}
                startGame={startGame}
                timerDisplayed={timerDisplayed}
                setTimerDisplayed={setTimerDisplayed}
            />
        );
    }
}

const ConfigureGame = (props) => {
    const gameState = props.gameState;
    const setToSelectCollection = props.setToSelectCollection;
    const setToSelectSize = props.setToSelectSize;
    const collections = props.collections;
    const collection = props.collection;
    const setCollection = props.setCollection;
    const maxSizeByCollection = props.maxSizeByCollection;
    const sampleCards = props.sampleCards;
    const selectedSize = props.selectedSize;
    const setSelectedSize = props.setSelectedSize;
    const startGame = props.startGame;
    const timerDisplayed = props.timerDisplayed;
    const setTimerDisplayed = props.setTimerDisplayed;

    const className = gameState === 'Not Started' ? 'configure-game-container' : 'configure-game-container-choose-collection';

    return (
        <div className={className}>
            <GameConfigurationBody
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
        </div>
    );
}

export default ConfigureGame;
