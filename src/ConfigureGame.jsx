import { getImgSrcPath } from "./js/gameUtilities";

const DisplayPlayGamePopup = (props) => {
    const setToSelectCollection = props.setToSelectCollection;

    return (
        <div id='game-configuration-body' className='display-play-game-popup-container'>
             <p className="play-game-title">The Match Game</p>
             <button type='button' className='play-game-button-text pale-azure-color' onClick={setToSelectCollection}>
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
        <div id='game-configuration-body' className='display-play-game-popup-container-choose-collection'>
            <div className='game-configuration-container'>
                <p className='choose-configuration-attribute-prompt'>Choose Collection</p>
                <div className='configure-attribute-selector-container'>
                    <button className='configure-attribute-selector-button' onClick={onLeftChevronButtonClick} type='button'>
                        <img className='configure-collection-selector-chevron-right-img left-right-mirror-flip-img' src='/src/images/application-controls/chevron-right.svg'>
                        </img>
                    </button>
                    <p className="configure-attribute-title">{collection}</p>
                    <button className='configure-attribute-selector-button' onClick={onRightChevronButtonClick} type='button'>
                        <img className='configure-collection-selector-chevron-right-img' src='/src/images/application-controls/chevron-right.svg'>
                        </img>
                    </button>
                </div>
                <img className='sample-card' src={cardImgSrc}>
                </img>
                <button type='button' className='prev-next-button pale-azure-color' onClick={setToSelectSize}>
                     <p className='margin-left-20px prev-prev-next-button-text'>Next</p>
                     <img className='prev-next-button-chevron-right-img' src='/src/images/application-controls/chevron-right-white.svg'></img>
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

    const decreaseSize = () => {
        setSelectedSize( selectedSize - 2 );
    }

    const increaseSelectedSize = () => {
        setSelectedSize( selectedSize + 2 );
    }

    const decreaseSizeControl = selectedSize <= 4 ?
                                    <div className='configure-attribute-selector-button'>
                                        <p className='size-button-text size-text-padding size-button-text-disabled'>-</p>
                                    </div> :
                                    <button className='configure-attribute-selector-button' type='button' onClick={decreaseSize}>
                                        <p className='size-button-text size-text-padding size-button-text-enabled'>-</p>
                                    </button>

    const increaseSizeControl = selectedSize < maxSizeByCollection[collection] ?
                                    <button className='configure-attribute-selector-button' onClick={increaseSelectedSize}>
                                        <p className='size-button-text size-button-text-enabled'>+</p>
                                    </button> :
                                    <div className='configure-attribute-selector-button' type='button'>
                                        <p className='size-button-text size-button-text-disabled'>+</p>
                                    </div>


    return (
        <div id='game-configuration-body' className='display-play-game-popup-container-choose-collection'>
            <div className='game-configuration-container'>
                <p className='choose-configuration-attribute-prompt'>Choose Size</p>
                <div className='configure-attribute-selector-container'>
                    {decreaseSizeControl}
                    <p className="configure-attribute-title">{selectedSize} x {selectedSize}</p>
                    {increaseSizeControl}
                </div>
                <div className='sample-card'>
                </div>
                <div className='button-row-container'>
                    <button type='button' className='prev-next-button african-violet' onClick={setToSelectCollection}>
                        <img className='prev-next-button-chevron-right-img left-right-mirror-flip-img' src='/src/images/application-controls/chevron-right-white.svg'></img>
                        <p className='prev-prev-next-button-text margin-right-20px'>Prev</p>
                    </button>
                    <div className='spacer-10px-by-10px'></div>
                    <button type='button' className='prev-next-button pale-azure-color' onClick={startGame}>
                        <p className='prev-prev-next-button-text margin-left-20px'>Start</p>
                        <img className='prev-next-button-chevron-right-img' src='/src/images/application-controls/chevron-right-white.svg'></img>
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
            />
        </div>
    );
}

export default ConfigureGame;
