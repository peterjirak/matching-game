import { useLayoutEffect } from 'react';
import cardBack from './images/game-images/card-back.png';
import { isPending } from '@reduxjs/toolkit';

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
        if (i < size - 1) {
            let cardSpacer = <div className='card-spacer'></div>
            cards.push(cardSpacer);
        }
    }

    return (
        <>
            <div id={`game-row-${rowIndex}`} className='game-row'>
                {cards}
            </div>
            <div className='row-spacer'>
            </div>
        </>
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
            const gameBoard = document.getElementById('game-board');
            const rowHeight = Math.floor( ( gameBoard.clientHeight - 0 ) / size ) - 25;
            const gameBoardWidth = Math.floor( gameBoard.clientWidth );

            for (let i = 0; i < size; i += 1) {
                const gameRow = document.getElementById(`game-row-${i}`);
                gameRow.style.height = `${rowHeight}px`;
            }

            const cellWidth = Math.floor( gameBoardWidth / size ) - 25;

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
