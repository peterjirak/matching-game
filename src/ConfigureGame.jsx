import { getImgSrcPath } from "./js/gameUtilities";

const DisplayPlayGamePopup = (props) => {
    const setToSelectCollection = props.setToSelectCollection;

    return (
        <div id='game-configuration-body' className='display-play-game-popup-container'>
             <p className="play-game-title">The Match Game</p>
             <button type='button' className='play-game-button-text' onClick={setToSelectCollection}>
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
    }

    const onRightChevronButtonClick = () => {
        setCollection(rightCollection);
    }

    return (
        <div id='game-configuration-body' className='display-play-game-popup-container-choose-collection'>
            <div className='game-configuration-choose-collection-container'>
                <p className='choose-collection-prompt'>Choose Collection</p>
                <div className='configure-collection-selector-container'>
                    <button className='configure-collection-selector-chevron-button' onClick={onLeftChevronButtonClick}>
                        <img className='configure-collection-selector-chevron-right-img left-right-mirror-flip-img' src='/src/images/application-controls/chevron-right.svg'>
                            </img>
                        </button>
                    <p className="configure-collection-title">{collection}</p>
                    <button className='configure-collection-selector-chevron-button' onClick={onRightChevronButtonClick}>
                        <img className='configure-collection-selector-chevron-right-img' src='/src/images/application-controls/chevron-right.svg'>
                        </img>
                    </button>
                </div>
                <img className='sample-card' src={cardImgSrc}>
                </img>
                <button type='button' className='next-button'>
                 <p className='next-button-text'>Next</p>
                 <img className='next-button-chevron-right-img' src='/src/images/application-controls/chevron-right-white.svg'></img>
                </button>
            </div>
        </div>
    );

}

const ConfigureDimension = (props) => {

}

const GameConfigurationBody = (props) => {
    const gameState = props.gameState;
    const setToSelectCollection = props.setToSelectCollection;
    const collections = props.collections;
    const collection = props.collection;
    const setCollection = props.setCollection;
    const sampleCards = props.sampleCards;


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
    } else {
        return (
            <ConfigureCollection
                collections={collections}
                collection={collection}
                setCollection={setCollection}
                sampleCards={sampleCards}
            />
        );
    }
}

const ConfigureGame = (props) => {
    const gameState = props.gameState;
    const setToSelectCollection = props.setToSelectCollection;
    const collections = props.collections;
    const collection = props.collection;
    const setCollection = props.setCollection;
    const sampleCards = props.sampleCards;

    const className = gameState === 'Not Started' ? 'configure-game-container' : 'configure-game-container-choose-collection';

    return (
        <div className={className}>
            <GameConfigurationBody
                gameState={gameState}
                setToSelectCollection={setToSelectCollection}
                collections={collections}
                collection={collection}
                setCollection={setCollection}
                sampleCards={sampleCards}
            />
        </div>
    );
}

export default ConfigureGame;
