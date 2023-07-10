import { useLayoutEffect } from 'react';
import cardBack from './images/game-images/card-back.png';
import { isPending } from '@reduxjs/toolkit';

const GameCard = (props) => {
    const cardIndex = props.cardIndex;
    const cardCollection = props.cardCollection;
    const faceUp = props.faceUp || false;
    const imageId = props.imageId || null;
    const setUpCards = props.setUpCards;
    const setCardFaceUp = props.setCardFaceUp;

    let collectionId = cardCollection;
    collectionId = collectionId.trim();
    collectionId = collectionId.toLowerCase();
    collectionId = collectionId.replace(/ /g, '-');

    const onClick = () => {
        if (!faceUp) {
            if (!imageId) {
                setUpCards();
            }
            setCardFaceUp(cardIndex);
        }
    }

    let src = null;
    if (!faceUp || !imageId) {
        src = '/src/images/game-images/card-back.png';
    } else {
        src = `/src/images/match-collections/${collectionId}/${collectionId}-id-${imageId}.png`;
    }

    return (
        <img id={`card-${cardIndex}`} className='game-card' src={src} onClick={onClick}>
        </img>
    );
}

const GameRow = (props) => {
    const size = props.size;
    const rowIndex = props.rowIndex;
    const cardCollection = props.cardCollection;
    const setUpCards = props.setUpCards;
    const imageIdsForCards = props.imageIdsForCards;
    const cardsFaceUp = props.cardsFaceUp;
    const setCardFaceUp = props.setCardFaceUp;

    const cards = [];

    for (let i = 0; i < size; i += 1) {
        let cardIndex = rowIndex * size + i;
        let imageId = imageIdsForCards ? imageIdsForCards[cardIndex] : null;
        let faceUp = cardsFaceUp ? cardsFaceUp[cardIndex] : false;
        let card = <GameCard
                             cardIndex={cardIndex}
                             cardCollection={cardCollection}
                             imageId={imageId}
                             faceUp={faceUp}
                             setUpCards={setUpCards}
                             setCardFaceUp={setCardFaceUp}
                   />
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
    const cardCollection = props.cardCollection;
    const setUpCards = props.setUpCards;
    const imageIdsForCards = props.imageIdsForCards;
    const cardsFaceUp = props.cardsFaceUp;
    const setCardFaceUp = props.setCardFaceUp;

    const rows = [];

    for (let i = 0; i < size; i += 1) {
        let row = <GameRow
                      size={size}
                      rowIndex={i}
                      cardCollection={cardCollection}
                      setUpCards={setUpCards}
                      imageIdsForCards={imageIdsForCards}
                      cardsFaceUp={cardsFaceUp}
                      setCardFaceUp={setCardFaceUp}
                  />
        rows.push(row)
    }

    return (
        <div id='game-board' className="game-board">
            {rows}
        </div>
    );
}

export default Game;
