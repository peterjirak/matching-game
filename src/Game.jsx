import { useLayoutEffect } from 'react';
import cardBack from './images/game-images/card-back.png';
import { isPending } from '@reduxjs/toolkit';

const GameCard = (props) => {
    const cardIndex = props.cardIndex;
    const cardCollection = props.cardCollection;
    const faceUp = props.faceUp || false;
    const setUpCards = props.setUpCards;
    const imageIdsForCards = props.imageIdsForCards;
    const setCardFaceUp = props.setCardFaceUp;
    const setCardFaceDown = props.setCardFaceDown;
    const setCardsToMatched = props.setCardsToMatched;
    const activeCards = props.activeCards;
    const setActiveCards = props.setActiveCards;
    const imageId = imageIdsForCards ? imageIdsForCards[cardIndex] : null;

    let collectionId = cardCollection;
    collectionId = collectionId.trim();
    collectionId = collectionId.toLowerCase();
    collectionId = collectionId.replace(/ /g, '-');

    const onClick = () => {
        if (!faceUp) {
            if (!imageId) {
                setUpCards();
                setActiveCards([...activeCards, cardIndex]);
                setCardFaceUp(cardIndex);
            } else {
                let matchesIndex = null;
                if (activeCards.length > 0) {
                    for (let i = 0; i < activeCards.length; i += 1) {
                        let activeCardIndex = activeCards[i];
                        if (cardIndex === activeCardIndex) {
                            continue;
                        } else {
                            let activeCardImageId = imageIdsForCards[activeCardIndex];
                            if (imageId === activeCardImageId) {
                                matchesIndex = activeCardIndex;
                                setCardsToMatched(cardIndex, activeCardIndex, imageId);
                                let newActiveCardSet = [...activeCards];
                                newActiveCardSet.splice(i, 1);
                                setActiveCards([...newActiveCardSet]);
                                break;
                            }
                        }
                    }
                    if (!matchesIndex) {
                        if (!activeCards.includes(cardIndex)) {
                            if (activeCards.length < 2) {
                                let newActiveCardSet = [...activeCards, cardIndex];
                                setActiveCards([...newActiveCardSet]);
                            } else {
                                for (let activeCardIndex of activeCards) {
                                    setCardFaceDown(activeCardIndex);
                                }
                                setActiveCards([cardIndex]);
                            }
                        }
                    }
                }
                setCardFaceUp(cardIndex);
            }
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
    const setCardFaceDown = props.setCardFaceDown;
    const setCardsToMatched = props.setCardsToMatched;
    const activeCards = props.activeCards;
    const setActiveCards = props.setActiveCards;

    const cards = [];

    for (let i = 0; i < size; i += 1) {
        let cardIndex = rowIndex * size + i;
        let faceUp = cardsFaceUp ? cardsFaceUp[cardIndex] : false;
        let card = <GameCard
                             cardIndex={cardIndex}
                             cardCollection={cardCollection}
                             imageIdsForCards={imageIdsForCards}
                             faceUp={faceUp}
                             setUpCards={setUpCards}
                             setCardFaceUp={setCardFaceUp}
                             setCardFaceDown={setCardFaceDown}
                             setCardsToMatched={setCardsToMatched}
                             activeCards={activeCards}
                             setActiveCards={setActiveCards}
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
    const setCardFaceDown = props.setCardFaceDown;
    const setCardsToMatched = props.setCardsToMatched;
    const activeCards = props.activeCards;
    const setActiveCards = props.setActiveCards;

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
                      setCardFaceDown={setCardFaceDown}
                      setCardsToMatched={setCardsToMatched}
                      activeCards={activeCards}
                      setActiveCards={setActiveCards}
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
