import DropdownSingleItemSelector from './DropdownSingleItemSelector';


const AboveGameNotStarted = (props) => {
    const collection = props.collection;
    const setCollection = props.setCollection;
    const collectionDimensions = props.collectionDimensions;
    const selectedDimension = props.selectedDimension;
    const setSelectedDimension = props.setSelectedDimension;
    const dimensionSelectorOpen = props.dimensionSelectorOpen;
    const setDimensionSelectorOpen = props.setDimensionSelectorOpen;
    const collectionSelectorOpen = props.collectionSelectorOpen;
    const setCollectionSelectorOpen = props.setCollectionSelectorOpen; 

    return (
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
    );
}

const AboveGameInProgress = (props) => {
    return (
        <div id='above-game' className="above-game">
            <div className="above-game-left">
            </div>
            <div className="above-game-middle">
                <p className="game-title">The Match Game</p>
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
    const selectedDimension = props.selectedDimension;
    const setSelectedDimension = props.setSelectedDimension;
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
                selectedDimension={selectedDimension}
                setSelectedDimension={setSelectedDimension}
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
