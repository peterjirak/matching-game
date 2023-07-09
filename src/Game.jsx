import { useLayoutEffect } from 'react';
import cardBack from './images/game-images/card-back.png';
import { isPending } from '@reduxjs/toolkit';

const rowStyles = {
    '4': 'four-rows',
    '6': 'six-rows',
    '8': 'eight-rows',
    '10': 'ten-rows',
    '12': 'twelve-rows'
}

const GameCard = (props) => {
    const cardIndex = props.cardIndex;
    return (
        <img id={`card-${cardIndex}`} className='game-card' src={cardBack}>
        </img>
    );
}

const GameRow = (props) => {
    const size = props.size;
    const rowIndex = props.rowIndex;
    const cards = [];

    for (let i = 0; i < size; i += 1) {
        let cardIndex = rowIndex * size + i;
        let card = <GameCard cardIndex={cardIndex}/>
        cards.push(card);
    }

    return (
        <div id={`game-row-${rowIndex}`} className={`game-row ${rowStyles[size]}`}>
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

    useLayoutEffect(
        () => {
            const gameRowIndex0 = document.getElementById('game-row-0');
            const rowWidth = gameRowIndex0.offsetWidth;
            const rowHeight = Math.floor( gameRowIndex0.offsetHeight );
            const cellWidth = Math.floor( rowWidth / size );
            const dimension = rowHeight < cellWidth ? rowHeight : cellWidth;

            for (let i = 0; i < size * size; i += 1) {
                const card = document.getElementById(`card-${i}`);
                card.style.height = `${dimension}px`;
                card.style.width = `${dimension}px`;
            }
        }
    );

    return (
        <div id='game-board' className="game-board">
            {rows}
        </div>
    );
}

export default Game;
