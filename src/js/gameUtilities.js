'use strict';

const getImgSrcPath = (collection, imageId) => {
    if (!imageId) {
        return null;
    }

    let collectionId = collection;
    collectionId = collectionId.trim();
    collectionId = collectionId.toLowerCase();
    collectionId = collectionId.replace(/ /g, '-');

    const src = `/src/images/match-collections/${collectionId}/${collectionId}-id-${imageId}.png`;

    return src;
}

const scoreBase = 20;

const maxPointsForOneMatch = (size) => {
    const scoreMultiplier = size <= 4  ? 1 :
                            size <= 6  ? 2 :
                            size <= 8  ? 3 :
                            size <= 10 ? 4 :
                                         5;

    return scoreBase * scoreMultiplier;
}

const minPointsForOneMatch = (size) => {
    return 1;
}

const pointsForMatch = (size, card1FlipCount, card2FlipCount) => {
    const maxForOneMatch = maxPointsForOneMatch(size);
    if (card1FlipCount + card2FlipCount <= 4) {
        return maxForOneMatch;
    }
    const points = maxForOneMatch - card1FlipCount - card2FlipCount + 4;
    const minForOneMatch = minPointsForOneMatch(size);
    return minForOneMatch > points ? points : minForOneMatch;
}

export { getImgSrcPath, maxPointsForOneMatch, pointsForMatch };
