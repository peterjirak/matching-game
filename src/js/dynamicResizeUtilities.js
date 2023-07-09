'use strict';

const dynamicallySizeGameElements = () => {
    const gameBoardElement = document.getElementById('game-board');
    if (gameBoardElement) {
        const childCount = gameBoardElement.children.length;
        if (childCount % 2 !== 0) {
            throw new Error('Unable to determine how many rows the game ' +
                            'board has. The number of child elements of ' +
                            `the game board is ${childCount}. Expect one ` +
                            'child element for each row plus one spacer ' +
                            'after each row, that number should always be even. ' +
                            'Dividing that number by 2 should give the number ' +
                            `of rows, however the child count is ${childCount} ` +
                            'that number is odd. Cannot determine the number ' +
                            'of rows on the game board.');
        }
        const size = childCount / 2;
        if (![4, 6, 8, 10, 12].includes(size)) {
            throw new Error('Failed to determine the number of rows in the ' +
                            'game. A game should have either 4, 6, 8, 10, or ' +
                            '12 rows. Attempted to determine the number of ' +
                            'rows this game has by getting the game-board ' +
                            'element, getting a count of its children, and ' +
                            'then dividing by two. The game-board element ' +
                            'should have two children for every row -- a ' +
                            `row element and a spacer element. That ' +
                            'calculation produced the value ${size}. ` +
                            'That value is not 4, 6, 8, 10, nor 12.');
        }
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const aboveGameElement = document.getElementById('above-game');
        const aboveGameElementHeight = aboveGameElement.offsetHeight;

        gameBoardElement.style.height = `${Math.floor(viewportHeight - aboveGameElementHeight)}px`;
        const rowHeight = Math.floor((viewportHeight - aboveGameElementHeight)/size) - 25;
        const cellWidth = Math.floor(viewportWidth/size) - 25;
        const cardDimension = cellWidth < rowHeight ? cellWidth : rowHeight;
        for (let i = 0; i < size; i += 1) {
            const rowElement = document.getElementById(`game-row-${i}`);
            rowElement.style.height = `${rowHeight}px`;
        }
        for (let i = 0; i < size * size; i += 1) {
            const cardElement = document.getElementById(`card-${i}`);
            cardElement.style.width = `${cardDimension}px`;
            cardElement.style.height = `${cardDimension}px`;
        }
    }
}

window.dynamicallySizeGameElements = dynamicallySizeGameElements;
