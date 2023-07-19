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
    const setIdOfLargeImageToView = props.setIdOfLargeImageToView;
    const gameState = props.gameState;
    const setGameState = props.setGameState;
    const cardFlipCounts = props.cardFlipCounts;
    const setCardFlipCounts = props.setCardFlipCounts;
    const gameScore = props.gameScore;
    const setGameScore = props.setGameScore;

    const faceUp = cardsFaceUp ? cardsFaceUp[cardIndex] : false;
    const imageId = imageIdsForCards ? imageIdsForCards[cardIndex] : null;

    let collectionId = cardCollection;
    collectionId = collectionId.trim();
    collectionId = collectionId.toLowerCase();
    collectionId = collectionId.replace(/ /g, '-');

    const onClick = () => {
        if (!faceUp) {
            if (gameState === 'Not Started') {
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
                let newCardFlipCounts = null;
                if (!cardFlipCounts) {
                    newCardFlipCounts = new Array(size * size).fill(0);
                } else {
                    newCardFlipCounts = [...cardFlipCounts];
                }
                newCardFlipCounts[cardIndex] += 1;
                setActiveCards(newActiveCards);
                setCardsFaceUp(newCardsFaceUp);
                setCardFlipCounts(newCardFlipCounts);
                setGameState('In-Progress');
            } else {
                if (!activeCards || activeCards.length < 1) {
                    let newCardsFaceUp = null;
                    if (!cardsFaceUp) {
                        newCardsFaceUp = new Array(size * size).fill(null);
                    } else {
                        newCardsFaceUp = [...cardsFaceUp];
                    }
                    newCardsFaceUp[cardIndex] = true;
                    let newCardFlipCounts = null;
                    if (!cardFlipCounts) {
                        newCardFlipCounts = new Array(size * size).fill(0);
                    } else {
                        newCardFlipCounts = [...cardFlipCounts];
                    }
                    newCardFlipCounts[cardIndex] += 1;
                    setActiveCards( [ cardIndex ] );
                    setCardsFaceUp(newCardsFaceUp);
                    setCardFlipCounts(newCardFlipCounts);
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
                    let newCardFlipCounts = null;
                    if (!cardFlipCounts) {
                        newCardFlipCounts = new Array(size * size).fill(0);
                    } else {
                        newCardFlipCounts = [...cardFlipCounts];
                    }
                    newCardFlipCounts[cardIndex] += 1;
                    setActiveCards(newActiveCards);
                    setCardsFaceUp(newCardsFaceUp);
                    setCardFlipCounts(newCardFlipCounts);
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
                        let newCardFlipCounts = null;
                        if (!cardFlipCounts) {
                            newCardFlipCounts = new Array(size * size).fill(0);
                        } else {
                            newCardFlipCounts = [...cardFlipCounts];
                        }
                        newCardFlipCounts[cardIndex] += 1;
                        const activeCardFlipCounts = newCardFlipCounts[activeCardIndex];
                        const thisCardFlipCounts = newCardFlipCounts[cardIndex];
                        const scoreMultiplier = size <= 4  ? 1 :
                                                size <= 6  ? 2 :
                                                size <= 8  ? 3 :
                                                size <= 10 ? 4 :
                                                             5;
                        let matchPoints = ( 20 * scoreMultiplier ) - activeCardFlipCounts - thisCardFlipCounts + 3;
                        matchPoints = matchPoints > ( 20 * scoreMultiplier ) ? ( 20 * scoreMultiplier ) : matchPoints < 1 ? 1 : matchPoints;
                        const newScore = ( gameScore || 0 ) + matchPoints;
                        let gameCompleted = true;
                        for (let cardImageId of newMatchedCards) {
                            if (!cardImageId) {
                                gameCompleted = false;
                                break;
                            }
                        }
                        setActiveCards(newActiveCards);
                        setCardsFaceUp(newCardsFaceUp);
                        setMatchedCards(newMatchedCards);
                        setCardFlipCounts(newCardFlipCounts);
                        setGameScore(newScore);
                        if (gameCompleted) {
                            setGameState('Completed');
                        }
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
                        let newCardFlipCounts = null;
                        if (!cardFlipCounts) {
                            newCardFlipCounts = new Array(size * size).fill(0);
                        } else {
                            newCardFlipCounts = [...cardFlipCounts];
                        }
                        newCardFlipCounts[cardIndex] += 1;
                        setActiveCards(newActiveCards);
                        setCardsFaceUp(newCardsFaceUp);
                        setCardFlipCounts(newCardFlipCounts);
                    }
                }
            }
        } else {
            if (imageId) {
                setIdOfLargeImageToView(imageId);
            }
        }
    }

    let src = null;
    if (!faceUp || !imageId) {
        src = '/src/images/game-images/card-back.png';
    } else {
        src = `/src/images/match-collections/${collectionId}/${collectionId}-id-${imageId}.png`;
    }

    const cardClassNames = 'game-card' + ( faceUp ? ' game-card-face-up' : '' );

    return (
        <img id={`card-${cardIndex}`} className={cardClassNames} src={src} onClick={onClick}>
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
    const setIdOfLargeImageToView = props.setIdOfLargeImageToView;
    const gameState = props.gameState;
    const setGameState = props.setGameState;
    const cardFlipCounts = props.cardFlipCounts;
    const setCardFlipCounts = props.setCardFlipCounts;
    const gameScore = props.gameScore;
    const setGameScore = props.setGameScore;

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
                             cardFlipCounts={cardFlipCounts}
                             setCardFlipCounts={setCardFlipCounts}
                             gameScore={gameScore}
                             setGameScore={setGameScore}
                             activeCards={activeCards}
                             setActiveCards={setActiveCards}
                             setIdOfLargeImageToView={setIdOfLargeImageToView}
                             gameState={gameState}
                             setGameState={setGameState}
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
    const cardFlipCounts = props.cardFlipCounts;
    const setCardFlipCounts = props.setCardFlipCounts;
    const gameScore = props.gameScore;
    const setGameScore = props.setGameScore;


    const activeCards = props.activeCards;
    const setActiveCards = props.setActiveCards;
    const setIdOfLargeImageToView = props.setIdOfLargeImageToView;
    const gameState = props.gameState;
    const setGameState = props.setGameState;

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
                      cardFlipCounts={cardFlipCounts}
                      setCardFlipCounts={setCardFlipCounts}
                      gameScore={gameScore}
                      setGameScore={setGameScore}
                      activeCards={activeCards}
                      setActiveCards={setActiveCards}
                      setIdOfLargeImageToView={setIdOfLargeImageToView}
                      gameState={gameState}
                      setGameState={setGameState}
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
