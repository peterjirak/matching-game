import { getImgSrcPath } from "./js/gameUtilities";

const AboveGameConfiguration = (props) => {
    return (
        <div className='above-game-configuration-container'>
        </div>
    );
}

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

    return (
        <div id='game-configuration-body' className='display-play-game-popup-container'>
            <div className='game-configuration-choose-collection-container'>
                <p className='choose-collection-prompt'>Choose Collection</p>
                <img className='sample-card' src={cardImgSrc}>
                </img>
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


    return (
        <div className='configure-game-container'>
            <AboveGameConfiguration />
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
