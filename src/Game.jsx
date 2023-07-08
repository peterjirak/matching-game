const GameRow = (props) => {
    const size = props.size;
    const rowIndex = props.rowIndex;

    return (
        <div className='game-row'>
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
