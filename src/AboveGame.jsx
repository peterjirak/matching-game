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

const AboveGameInProgress = (props) => {
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

const AboveGame = (props) => {
    const gameState = props.gameState;
    const collection = props.collection;
    const setCollection = props.setCollection;
    const collectionDimensions = props.collectionDimensions;
    const selectedSize = props.selectedSize;
    const setSelectedSize = props.setSelectedSize;
    const dimensionSelectorOpen = props.dimensionSelectorOpen;
    const setDimensionSelectorOpen = props.setDimensionSelectorOpen;
    const collectionSelectorOpen = props.collectionSelectorOpen;
    const setCollectionSelectorOpen = props.setCollectionSelectorOpen; 

    if (gameState === 'Not Started') {
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
            <AboveGameInProgress />
        );
    }
}

export default AboveGame;
