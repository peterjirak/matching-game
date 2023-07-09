import cardBack from './images/game-images/card-back.png';

const GameCard = (props) => {
    return (
        <img className='game-card' src={cardBack}>
        </img>
    );
}

const GameRow = (props) => {
    const size = props.size;
    const rowIndex = props.rowIndex;
    const cards = [];

    for (let i = 0; i < size; i += 1) {
        let card = <GameCard />
        cards.push(card);
    }

    return (
        <div className='game-row'>
            {cards}
        </div>
    );
}

const Game = (props) => {
    const size = props.size;

    const rows = [];

    for (let i = 0; i < size; i += 1) {
        let row = <GameRow
                      size={size}
                      rowIndex={i}
                  />
        rows.push(row)
    }

    return (
        <div className="game-board">
            {rows}
        </div>
    );
}

export default Game;
