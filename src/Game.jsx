import { useLayoutEffect } from 'react';
import cardBack from './images/game-images/card-back.png';
import { isPending } from '@reduxjs/toolkit';

const GameCard = (props) => {
    const size = props.size;
    const cardIndex = props.cardIndex;
    const cardCollection = props.cardCollection;
    const setUpCards = props.setUpCards;
    const imageIdsForCards = props.imageIdsForCards;
    const cardsFaceUp = props.cardsFaceUp;
    const setCardsFaceUp = props.setCardsFaceUp;
    const matchedCards = props.matchedCards;
    const setMatchedCards = props.setMatchedCards;
    const activeCards = props.activeCards;
    const setActiveCards = props.setActiveCards;

    const faceUp = cardsFaceUp ? cardsFaceUp[cardIndex] : false;
    const imageId = imageIdsForCards ? imageIdsForCards[cardIndex] : null;

    let collectionId = cardCollection;
    collectionId = collectionId.trim();
    collectionId = collectionId.toLowerCase();
    collectionId = collectionId.replace(/ /g, '-');

    const onClick = () => {
        if (!faceUp) {
            if (!imageId) {
                setUpCards();
                let newActiveCards = activeCards ? [...activeCards, cardIndex] : [cardIndex];
                setActiveCards([...activeCards, cardIndex]);
                let newCardsFaceUp = null;
                if (!cardsFaceUp) {
                    newCardsFaceUp = new Array(size * size).fill(null);
                } else {
                    newCardsFaceUp = [...cardsFaceUp];
                }
                newCardsFaceUp[cardIndex] = true;
                setActiveCards(newActiveCards);
                setCardsFaceUp(newCardsFaceUp);
            } else {
                if (!activeCards || activeCards.length < 1) {
                    let newCardsFaceUp = null;
                    if (!cardsFaceUp) {
                        newCardsFaceUp = new Array(size * size).fill(null);
                    } else {
                        newCardsFaceUp = [...cardsFaceUp];
                    }
                    newCardsFaceUp[cardIndex] = true;
                    setActiveCards( [ cardIndex ] );
                    setCardsFaceUp(newCardsFaceUp);
                } else if (activeCards.length > 1) {
                    let newCardsFaceUp = null;
                    if (!cardsFaceUp) {
                        newCardsFaceUp = new Array(size * size).fill(null);
                    } else {
                        newCardsFaceUp = [...cardsFaceUp];
                    }
                    for (let activeCardIndex of activeCards) {
                        newCardsFaceUp[activeCardIndex] = false;
                    }
                    newCardsFaceUp[cardIndex] = true;
                    let newActiveCards = [cardIndex];
                    setActiveCards(newActiveCards);
                    setCardsFaceUp(newCardsFaceUp);
                } else {
                    let activeCardIndex = activeCards[0];
                    let activeCardImageId = imageIdsForCards[activeCardIndex];
                    if (activeCardImageId === imageId) {
                        let newActiveCards = [];
                        let newCardsFaceUp = null;
                        if (!cardsFaceUp) {
                            newCardsFaceUp = new Array(size * size).fill(null);
                        } else {
                            newCardsFaceUp = [...cardsFaceUp];
                        }
                        newCardsFaceUp[activeCardIndex] = true;
                        newCardsFaceUp[cardIndex] = true;
                        let newMatchedCards = null;
                        if (matchedCards) {
                            newMatchedCards = [...matchedCards];
                        } else {
                            newMatchedCards = new Array(size * size).fill(null);
                        }
                        newMatchedCards[activeCardIndex] = imageId;
                        newMatchedCards[cardIndex] = imageId;
                        setActiveCards(newActiveCards);
                        setCardsFaceUp(newCardsFaceUp);
                        setMatchedCards(newMatchedCards);
                    } else {
                        let newActiveCards = [activeCardIndex, cardIndex];
                        let newCardsFaceUp = null;
                        if (!cardsFaceUp) {
                            newCardsFaceUp = new Array(size * size).fill(null);
                        } else {
                            newCardsFaceUp = [...cardsFaceUp];
                        }
                        newCardsFaceUp[activeCardIndex] = true;
                        newCardsFaceUp[cardIndex] = true;
                        setActiveCards(newActiveCards);
                        setCardsFaceUp(newCardsFaceUp);
                    }
                }
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
    const setCardsFaceUp = props.setCardsFaceUp;
    const matchedCards = props.matchedCards;
    const setMatchedCards = props.setMatchedCards;
    const activeCards = props.activeCards;
    const setActiveCards = props.setActiveCards;

    const cards = [];

    for (let i = 0; i < size; i += 1) {
        let cardIndex = rowIndex * size + i;
        let faceUp = cardsFaceUp ? cardsFaceUp[cardIndex] : false;
        let card = <GameCard
                             size={size}
                             cardIndex={cardIndex}
                             cardCollection={cardCollection}
                             setUpCards={setUpCards}
                             imageIdsForCards={imageIdsForCards}
                             cardsFaceUp={cardsFaceUp}
                             setCardsFaceUp={setCardsFaceUp}
                             matchedCards={matchedCards}
                             setMatchedCards={setMatchedCards}
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
    const setCardsFaceUp = props.setCardsFaceUp;
    const matchedCards = props.matchedCards;
    const setMatchedCards = props.setMatchedCards;
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
                      setCardsFaceUp={setCardsFaceUp}
                      matchedCards={matchedCards}
                      setMatchedCards={setMatchedCards}
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
